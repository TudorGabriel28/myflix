const mongoose = require('mongoose');

async function mongooseLoader() {
  try {
    let dbUri: string;

    if (process.env.DB_URI) {
      dbUri = process.env.DB_URI;
    } else {
      throw new Error('DB_URI is not set');
    }

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(error);
  }
}

export default mongooseLoader;
