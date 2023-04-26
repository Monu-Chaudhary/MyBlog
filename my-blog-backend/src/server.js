import express from 'express';
import {db, connectToDB} from './db.js'

const app = express(); // create a new express app
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send("Hello! How do you do?");
});

app.get('/api/articles/:name', async (req, res) => {
    const {name} = req.params;
    const article = await db.collection('articles').findOne({name});
    if (article) {
        res.json(article);
    }
    else {
        res.sendStatus(404);
    }

})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params
    await db.collection('articles').updateOne({name}, {
        $inc: {votes: 1},
    });
    const article = await db.collection('articles').findOne({name})

    if (article) {
        res.send(`The new vote count for ${name} is ${article.votes}`);
    }
    else {
        res.sendStatus(404);
    }
});

app.post('/api/articles/:name/comment', async (req, res) => {
    const {postedBy, comment} = req.body
    const { name } = req.params
    await db.collection('articles').updateOne({name}, {
        $push: {comments: {postedBy, comment}},
    });
    const article = await db.collection('articles').findOne({name})

    if (article) {
        res.send(article.comments);
    }
    else {
        res.sendStatus(404);
    }
});

// call the function to connect to the database
connectToDB( () => {
    console.log("Successfully connected to the database.")
    // pass this as a parameter to the connectToDB function which will run as a callback function after database is connected.
    app.listen(8000, () => {
        console.log("Listening on port 8000.");
    });
})