import express from 'express';
import {db, connectToDB} from './db.js'
import 'dotenv/config';
import fs from 'fs';
import admin from 'firebase-admin';

import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express(); // create a new express app
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    req.user = {};
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            return res.sendStatus(400);
        }
    }
    next();
})

app.post('/api/articles/insert', async (req, res) => {
    const { uid } = req.user;

    const newArticle = {
        name: 'mongo',
        votes: 0,
        comments: [],
    }

    await db.collection('articles').insertOne(newArticle);
    console.log("HERE")
    const article = await db.collection('articles').findOne({name:'mongo'})

    if (article) {
        res.send(article);
    }
    else {
        res.sendStatus(404);
    }
})

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({name});

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    }
    else {
        res.sendStatus(404);
    }
});

app.use((req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const {uid} = req.user;

    const article = await db.collection('articles').findOne({name});

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);

        if (canUpvote) {
            await db.collection('articles').updateOne({name}, {
                $inc: {votes: 1},
                $push: {upvoteIds: uid}
            });
            const updatedArticle = await db.collection('articles').findOne({name})
            res.json(updatedArticle);
        }
    }
    else {
        res.sendStatus(404);
    }
});

app.post('/api/articles/:name/comment', async (req, res) => {
    const {comment} = req.body;
    const { name } = req.params;
    const {email} = req.user;

    await db.collection('articles').updateOne({name}, {
        $push: {comments: {postedBy: email, comment}},
    });
    const article = await db.collection('articles').findOne({name})

    if (article) {
        res.send(article);
    }
    else {
        res.sendStatus(404);
    }
});

const PORT = process.env.PORT || 8000

// call the function to connect to the database
connectToDB( () => {
    console.log("Successfully connected to the database.")
    // pass this as a parameter to the connectToDB function which will run as a callback function after database is connected.
    app.listen(8000, () => {
        console.log("Listening on port " + PORT);
    });
})