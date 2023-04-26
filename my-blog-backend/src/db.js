import { MongoClient } from "mongodb";

let db;

const connectToDB = async function (cb) {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db('react-blog-db');
    cb();
}

export {
    db, connectToDB
}