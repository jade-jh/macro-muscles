import { MongoClient } from 'mongodb';

let cachedClient = null;

export async function connectToDatabase() {
    if (cachedClient) return cachedClient;

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    cachedClient = client;
    return client;
}