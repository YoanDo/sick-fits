// starts node server

// make our variable accessible
require('dotenv').config({
  path: 'variables.env',
});
// require the createServer function
const createServer = require('./createServer');
// import the db
const db = require('./db');

const server = createServer();


// TODO use express middleware to handle cookies (json web token)
// TODO use express middleware to populate current user


server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, (deets) => {
  console.log(`Server is now running on port http://localhost:${deets.port}   🚀`);
});
