import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // put in ..env.local
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error("Please add your Mongo URI to ..env.local");
}

if (process.env.NODE_ENV === "development") {
    // In dev, reuse the same connection across HMR
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    // In prod, always create a new connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
