import { MongoClient, ServerApiVersion } from 'mongodb';

// Replace with your MongoDB connection string
// It's best to store this in an environment variable
// For local development with MongoDB Compass: mongodb://localhost:27017
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let clientPromise: Promise<MongoClient>;

// In development mode, use a global variable to preserve the connection across hot reloads
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  if (!global._mongoClientPromise) {
    // @ts-ignore
    global._mongoClientPromise = client.connect();
  }
  // @ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  clientPromise = client.connect();
}

export default clientPromise;
