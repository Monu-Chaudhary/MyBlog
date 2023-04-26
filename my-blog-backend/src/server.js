import express from 'express';

let articles = [
    {
        name: 'learn-react',
        votes: 0,
        comments: [],
    },
    {
        name: 'learn-mongo',
        votes: 0,
        comments: [],
    },
    {
        name: 'learn-node',
        votes: 0,
        comments: [],
    },
]

const app = express(); // create a new express app
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send("Hello! How do you do?");
});

app.post('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params
    const article = articles.find(article => name == article.name)
    if (article) {
        article.votes++
        res.send(`The new vote count for ${name} is ${article.votes}`);
    }
    else {
        res.send('No such article found.')
    }
});

app.put('/api/articles/:name/comment', (req, res) => {
    const {postedBy, comment} = req.body
    const { name } = req.params
    const article = articles.find(article => name == article.name)
    if (article) {
        article.comments.push({'posedBy': postedBy, 'comment': comment})
        res.send(article.comments);
    }
    else {
        res.send('No such article found.')
    }
});

app.listen(8000, () => {
    console.log("Listening on port 8000.");
});