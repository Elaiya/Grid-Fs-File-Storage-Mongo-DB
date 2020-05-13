const dotenv = require('dotenv');
const envFound = dotenv.config();

if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
    PORT : process.env.PORT
}

module.exports = config;