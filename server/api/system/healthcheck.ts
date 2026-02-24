import mongoose from 'mongoose';
const startTime = new Date();

export default defineEventHandler(async (event) => {
  return {
    status: mongoose.connection.readyState === 1 ? 'success' : 'fail',
    uptime: process.uptime(),
    upSince: startTime,
    localTime: new Date(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      nodeVersion: process.version,
      processName: process.title,
      pid: process.pid,
      cwd: process.cwd(),
    },
  };
});
