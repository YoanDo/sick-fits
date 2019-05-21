// starts node server

//
const cookieParser =  require('cookie-parser');

// make our variable accessible
require('dotenv').config({
  path: 'variables.env',
});
// require the createServer function
const createServer = require('./createServer');
// import the db
const db = require('./db');

const server = createServer();


// use express middleware to handle cookies (json web token)
server.express.use(cookieParser());
// TODO use express middleware to populate current user


server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, (deets) => {
  console.log(`Server is now running on port http://localhost:${deets.port}   🚀`);
});
