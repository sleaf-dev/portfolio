import pkg from '~/package.json';
import { connectDB, isConnected } from '../database/MongoDB';

const startTime = new Date();

export default defineEventHandler(async () => {
  try {
    await connectDB();
  } catch {}
  return {
    status: isConnected ? 'success' : 'fail',
    uptime: process.uptime(),
    upSince: startTime,
    localTime: new Date(),
    service: {
      name: pkg.name,
      version: pkg.version,
    },
    database: {
      mongodb: isConnected,
    },
    env: {
      nodeEnv: process.env.NODE_ENV,
      nodeVersion: process.version,
      processName: process.title,
      pid: process.pid,
      cwd: process.cwd(),
    },
  };
});
