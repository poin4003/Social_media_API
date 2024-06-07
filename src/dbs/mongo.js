require('dotenv').config();
const mongoose = require('mongoose');

class Mongo {
  constructor() {
    this._connect();
  }

  _connect() {
    const env = process.env.NODE_ENV;

    let URI = '';
    if (env === 'dev') {
      URI = process.env.MONGO_URI_DEV;
    } else if (env === 'qc') {
      URI = process.env.MONGO_URI_QC;
    } else {
      URI = process.env.MONGO_URI_PROD;
    }

    console.log("\x1b[33m%s\x1b[0m", "URI: ", URI);
    mongoose.connect(URI).then(() => {
      console.info('\x1b[32mSUCCESS:\x1b[0m Connected to \x1b[36mMongoDB\x1b[0m');
    }).catch((error) => {
      console.error('\x1b[31mFAILED:\x1b[0m Can\'t connect to MongoDB: ', error);
    });
  }
}

module.exports = new Mongo();