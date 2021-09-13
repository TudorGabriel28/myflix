import app from './loaders/express';
import mongooseLoader from './loaders/mongoose';

require('dotenv').config();

async function startServer() {
  try {
    await mongooseLoader();
    console.log('Mongoose connected.');

    app.listen(process.env.PORT, () => {
      console.log(
        `Example app listening at http://localhost:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
