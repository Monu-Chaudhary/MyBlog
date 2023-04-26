import express from 'express';

const app = express(); // create a new express app
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send("Hello! How do you do?");
});

app.post('/hello', (req, res) => {
    res.send(`hello ${req.body.name}`);
});

app.post('/hello/:name', (req, res) => {
    let {name} = req.params;
    res.send(`hello ${name}`);
});

app.listen(8000, () => {
    console.log("Listening on port 8000.");
});