const express = require('express');
const app = express();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const users = [];

const database = [];

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
    let user = authenticate(authToken);
    if (user) {
        delete user.authToken;
        res.clearCookie("authToken");
        res.status(200).send();
    } else {
        res.status(401).send({msg: "Error: authorization no longer valid"})
    }
});

apiRouter.post("/create", async (req, res) => {
    const authToken = req.cookies.authToken;
    if(!authenticate(authToken)) {
        res.status(401).send({msg: "Error: authorization not valid"})
    } else {
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
    }
});

function authenticate(authToken) {
    return users.find(user => user.authToken === authToken);
}

const port = 3000;
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});