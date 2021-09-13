import express from 'express';
import mongooseLoader from './loaders/mongoose';

require('dotenv').config();

async function startServer() {
  try {
    await mongooseLoader();
    console.log('Mongoose connected.');

app.get('/', (req, res) => {
  res.send('Hello World!');
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
