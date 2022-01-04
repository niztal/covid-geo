const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {getVariants, addVariant} = require('./variants');

admin.initializeApp();

const app = express();
// app.use(corsMiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    res.send("Hello World");
})

app.get('/variants', async (req,res) => {
    const variants = await getVariants();
    res.json(variants);
})

app.post('/variants', async (req,res) => {
    console.log(req.body);
    const {name, date, geo} = req.body;
    await addVariant(name, date, geo);
    res.send(201);
})

exports.covid = functions.https.onRequest(app);