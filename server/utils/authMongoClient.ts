import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (client) return client;

  const url = process.env.MONGODB_URL || useRuntimeConfig().private.MONGODB_URL;
  const dbName = process.env.MONGODB_NAME || useRuntimeConfig().private.MONGODB_NAME;

  if (!url || !dbName) {
    throw new Error('❌⚠️ MONGODB_URL and MONGODB_NAME is required!');
  }

  const mongoUrl = `${url}/${dbName}?authSource=admin`;

  const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  };

  if (process.env.NODE_ENV === 'development') {
    let globalWithMongo = global as typeof globalThis & {
      _mongoClient?: MongoClient;
    };

    if (!globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient = new MongoClient(mongoUrl, options);
      await globalWithMongo._mongoClient.connect();
      console.log('✅ MongoDB connected (dev, global)');
    }
    client = globalWithMongo._mongoClient;
  } else {
    client = new MongoClient(mongoUrl, options);
    await client.connect();
    console.log('✅ MongoDB connected (production)');
  }

  return client;
}

export function getMongoClientSync(): MongoClient {
  if (!client) {
    throw new Error('❌ MongoClient not initialized. Call getMongoClient() first or use in Nitro context.');
  }
  return client;
}
