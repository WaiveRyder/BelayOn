const express = require('express');
const app = express();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const mongo = require("./database.js")
const { peerProxy } = require("./peerProxy.js");

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email === null || password === null) {
        res.status(400).send({msg: "Error: no null fields allowed"});
    } else if (await mongo.findStaffByEmail(email)) {
        res.status(409).send({msg: "Error: email already in use"});
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {email: email, password: hashedPassword, authToken: uuid.v4()}
        await mongo.createStaff(user)

        res.cookie("authToken", user.authToken, {secure: true, httpOnly: true, sameSite: "strict", maxAge: 1000*60*60*24});
        res.status(200).send({email: user.email});
    }
});

apiRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    
    let user = await mongo.findStaffByEmail(email)

    if (email === undefined || password === undefined) {
        res.status(400).send({msg: "Error: no null fields allowed"});
    } else if (user && user.email === email && await bcrypt.compare(password, user.password)) {
        user.authToken = uuid.v4();
        await mongo.addStaffAuth(user)
        res.cookie("authToken", user.authToken, {secure: true, httpOnly: true, sameSite: "strict", maxAge: 1000*60*60*24})
        res.status(200).send();
    } else {
        res.status(401).send({msg: "Error: username or password is incorrect"});
    }
});

apiRouter.delete("/logout", async (req, res) => {
    const authToken = req.cookies.authToken;
    let user = await mongo.findStaffByAuthToken(authToken);
    if (user) {
        await mongo.removeStaffAuth(user)
        res.clearCookie("authToken");
        res.status(200).send();
    } else {
        res.status(401).send({msg: "Error: authorization no longer valid"})
    }
});

apiRouter.post("/create", authenticate, async (req, res) => {
    const name = req.body.name;
    const birthday = req.body.birthday;
    const email = req.body.email;
    const type = req.body.type;
    const lastVisit = req.body.lastVisit;
    const checkedOut = req.body.checkedOut;
    const uuid = req.body.uuid;

    let user = {name: name, birthday: birthday, email: email, type: type, lastVisit: lastVisit, checkedOut: checkedOut, uuid: uuid}
    await mongo.createNewAccount(user)
    res.status(200).send();
});

apiRouter.get("/database", authenticate, async (req, res) => {
    res.send(await mongo.getAccounts()); 
});

apiRouter.get("/account/:uuid", authenticate, async (req, res) => {
    const uuid = req.params.uuid;
    const account = await mongo.getAccount(uuid);

    if (account) {
        res.send(account)
    } else {
        res.status(404).send({msg: "Error: account not found"})
    }
});

apiRouter.put("/reserve", authenticate, async (req, res) => {
    const uuid = req.body.uuid;
    const email = (await mongo.findStaffByAuthToken(req.cookies.authToken)).email;

    const response = await mongo.reserveAccount(email, uuid)

    if (response === "ANF") {
        res.status(404).send({msg: "Error: account not found"})
    } else if (response === email) {
        res.send();
    } else {
        res.status(408).send({msg: "Error: account already reserved by " + response})
    }
})

//REMOVE LATER --------------------------------------------
/*apiRouter.put("/reserve/websocket", authenticate, async (req, res) => {
    const uuid = req.body.uuid;
    const email = req.body.email;
    const account = database.find(account => account.uuid === uuid);
    
    if (account) {
        if (account.checkedOut.length === 1) {
            account.checkedOut.push(email);

            const accountCheck = database.find(account => account.uuid === uuid);
            if (accountCheck.checkedOut[1] === email) {
                res.send();
            } else {
                res.status(408).send({msg: "Error: account already reserved by " + accountCheck.checkedOut[1]})
            }
        } else if (account.checkedOut[1] === email) {
            res.send();
        } else {
            res.status(408).send({msg: "Error: account already reserved by " + account.checkedOut[1]})
        }
    } else {
        res.status(404).send({msg: "Error: account not found"})
    }
})

//REMOVE LATER ----------------------------------
apiRouter.put("/checkin/websocket", authenticate, async (req, res) => {
    const uuid = req.body.uuid;
    const email = req.body.email;
    const account = database.find(account => account.uuid === uuid);

    if (account) {
        if (account.checkedOut[1] === email) {
            account.checkedOut = ["No"];
            res.send();
        } else {
            res.status(402).send({msg: "Error: account is checked out by " + account.checkedOut[1]})
        }
    } else {
        res.status(404).send({msg: "Error: account not found"})
    }
})*/


apiRouter.put("/checkin", authenticate, async (req, res) => {
    const uuid = req.body.uuid;
    const email = (await mongo.findStaffByAuthToken(req.cookies.authToken)).email;

    const response = await mongo.checkInAccount(email, uuid)

    if (response === "ANF") {
        res.status(404).send({msg: "Error: account not found"})
    } else if (response === email) {
        res.send();
    } else {
        res.status(402).send({msg: "Error: account is checked out by " + response})
    }
})

apiRouter.put("/save", authenticate, async (req, res) => {
    const uuid = req.body.uuid;
    const email = (await mongo.findStaffByAuthToken(req.cookies.authToken)).email;

    const account = await mongo.getAccount(uuid)

    if (account) {
        account.name = req.body.name;
        account.birthday = req.body.birthday;
        account.email = req.body.email;
        account.type = req.body.type;
        account.lastVisit = req.body.lastVisit;
        account.checkedOut = ["No"];
        const response = await mongo.saveAccount(email, uuid, account)
        if (response === email) {
            res.send()
        } else {
            res.status(402).send({msg: "Error: account is checked out by " + response})
        }
    } else {
        res.status(404).send({msg: "Error: account not found"})
    }
})

async function authenticate(req, res, next) {
    const authToken = req.cookies.authToken;
    if (!(await mongo.findStaffByAuthToken(authToken))) {
        res.status(401).send({msg: "Error: authentication not valid"})
    } else {
        next();
    }
}

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const port = 4000;
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});