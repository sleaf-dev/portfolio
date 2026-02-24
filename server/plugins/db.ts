import mongoose from 'mongoose';

export default defineNitroPlugin(async (nitroApp) => {
  const url = process.env.MONGODB_URL || useRuntimeConfig().private.MONGODB_URL;
  const dbName = process.env.MONGODB_NAME || useRuntimeConfig().private.MONGODB_NAME;

  if (!url || !dbName) {
    throw new Error('❌⚠️ MONGODB_URL and MONGODB_NAME is required!');
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
  }

  nitroApp.hooks.hook('request', (event) => {
    event.context.mongoose = mongoose;
  });

  nitroApp.hooks.hook('close', async () => {
    console.log('🔌 Closing MongoDB connections...');
    await mongoose.disconnect();
  });
});
