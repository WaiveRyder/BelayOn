const express = require('express');
const app = express();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const users = [];

const customers = [];

app.use(express.json());
app.use(cookieParser());