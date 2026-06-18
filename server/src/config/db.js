import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI missing in server .env');
    }

    const mongoUri = process.env.MONGO_URI.trim();
    const parsedUri = new URL(mongoUri);
    console.log(`MongoDB connecting to ${parsedUri.hostname} as ${decodeURIComponent(parsedUri.username)}`);

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
