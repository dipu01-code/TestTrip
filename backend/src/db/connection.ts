import mongoose from 'mongoose';
import { env } from '../config/env.js';

let connected = false;

export async function connectMongo(): Promise<void> {
  if (connected) return;
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    connected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    throw err;
  }
}

export function isMongoConnected(): boolean {
  return connected && mongoose.connection.readyState === 1;
}