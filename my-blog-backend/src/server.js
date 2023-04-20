import express from 'express';

const app = express() // create a new express app

app.get('/hello', (req, res) => {
    res.send("Hello! How do you do?");
});

app.listen(8000, () => {
    console.log("Listening on port 8000.");
});