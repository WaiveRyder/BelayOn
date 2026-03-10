const express = require('express');
const app = express();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const users = [];

const customers = [];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email === null || password === null) {
        res.status(400).send({ msg: 'Erorr: no null fields allowed'});
    } else if (users.find(user => user.email === email)) {
        res.status(409).send({ msg: 'Error: email already in use'});
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { email: email, password: hashedPassword, authToken: uuid.v4()}
        users.push(user);

        res.cookie('authToken', user.authToken, { secure: true, httpsOnly: true, sameSite: 'strict', maxAge: 60*60*24})
        res.status(200).send({ email: user.email });
    }
});

const port = 3000;
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});