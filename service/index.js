const express = require('express');
const app = express();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const users = [];

const database = [
    {name: "Johnathan Tryall", birthday: "1/07/2002", email: "j.tryall@yahoo.com", type: "Member", lastVisit: "1/23/2006", checkedOut: "No", uuid: "c459b962-4a48-4ca3-9250-2db963f94889"},
    {name: "Samantha Smith", birthday: "7/12/2000", email: "s.smith@gmail.com", type: "Guest", lastVisit: "1/15/2026", checkedOut: 'No', uuid: "d68c4a55-942a-4431-aa34-180c9dbc299b"},
    {name: "Peter Quill", birthday: "10/30/1980", email: "startlord@hotmail.com", type: "Guest", lastVisit: "1/17/2026", checkedOut: "No", uuid: "3b15cbad-2d15-48a3-a710-4e0e2b6dd5eb"},
    {name: "Michael Jackson", birthday: "8/29/1958", email: "smoothcriminal@hehe.com", type: "Guest", lastVisit: "1/31/1988", checkedOut: "No", uuid: "11afaeb2-7e1c-449c-84c3-73e011fc2476"},
    {name: "Peter Parker", birthday: "8/10/2006", email: "notspiderman@gmail.com", type: "Member", lastVisit: "1/25/2026", checkedOut: "No", uuid: "97c34178-5c6f-47c2-a431-68af97731ae2"},
    {name: "Loki Laufeyson", birthday: "12/17/965", email: "godofmischeif@hotmail.com", type: "Guest", lastVisit: "2/25/2026", checkedOut: "No", uuid: "95290908-8fb5-43cd-9f0e-4ba3dc8e0b94"},
        ];

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
    } else if (users.find(user => user.email === email)) {
        res.status(409).send({msg: "Error: email already in use"});
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {email: email, password: hashedPassword, authToken: uuid.v4()}
        users.push(user);

        res.cookie("authToken", user.authToken, {secure: true, httpsOnly: true, sameSite: "strict", maxAge: 60*60*24});
        res.status(200).send({email: user.email});
    }
});

apiRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    
    const user = users.find(u => u.email === email);

    if (email === undefined || password === undefined) {
        res.status(400).send({msg: "Error: no null fields allowed"});
    } else if (user !== undefined && user.email === email && await bcrypt.compare(password, user.password)) {
        user.authToken = uuid.v4();
        res.cookie("authToken", user.authToken, {secure: true, httpsOnly: true, sameSite: "strict", maxAge: 60*60*24})
        res.status(200).send();
    } else {
        res.status(401).send({msg: "Error: username or password is incorrect"});
    }
});

apiRouter.delete("/logout", async (req, res) => {
    const authToken = req.cookies.authToken;
    let user = users.find(user => user.authToken === authToken);
    if (user) {
        delete user.authToken;
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
    database.push(user)
    res.status(200).send();
});

apiRouter.get("/database", authenticate, async (req, res) => {
    res.send(database); 
});

apiRouter.get("/account", authenticate, async (req, res) => {
    const uuid = req.body.uuid;
    const account = database.find(account => account.uuid === uuid);

    if (account) {
        res.send(account)
    } else {
        res.status(404).send({msg: "Error: account not found"})
    }
});

apiRouter.put("/reserve", authenticate, async (req, res) => {
    const uuid = req.body.uuid;
    const email = users.find(user => user.authToken === req.cookies.authToken).email;
    const account = database.find(account => account.uuid === uuid);
    
    if (account) {
        if (account.checkedOut.length === 1) {
            account.checkedOut.push(email);

            const accountCheck = database.find(account => account.uuid === uuid);
            if (accountCheck.checkedOut[1] === email) {
                res.status(200);
            } else {
                res.status(408).send({msg: "Error: account already reserved by " + accountCheck.checkedOut[1]})
            }
        } else {
            res.status(408).send({msg: "Error: account already reserved by " + account.checkedOut[1]})
        }
    } else {
        res.status(404).send({msg: "Error: account not found"})
    }
})

function authenticate(req, res, next) {
    const authToken = req.cookies.authToken;
    if (!users.find(user => user.authToken === authToken)) {
        res.status(401).send({msg: "Error: authentication not valid"})
    } else {
        next();
    }
}

const port = 3000;
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});