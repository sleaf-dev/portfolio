import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export default defineNitroPlugin(async (nitroApp) => {
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

  let client: MongoClient;

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

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url, {
        dbName,
        maxPoolSize: 10,
      });
      console.log(`✅ Mongoose connected to ${dbName}`);
    } catch (error) {
      console.error(`❌ Mongoose connection failed:`, error);
      throw error;
    }
  } else {
    console.log('ℹ️ Mongoose already connected');
  }

  nitroApp.hooks.hook('request', (event) => {
    event.context.mongo = client;
    event.context.mongoose = mongoose;
  });

  nitroApp.hooks.hook('close', async () => {
    console.log('🔌 Closing MongoDB connections...');
    await mongoose.disconnect();
    await client.close();
  });
});
