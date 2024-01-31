import mongoose from 'mongoose';

const config = useRuntimeConfig();

export default async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log(`Connected to DB`);
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    });
  }
};
