// this file starts node server
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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

// decode the jwt to get the user ID on each request
server.express.use((req, res, next) => {
  const token = req.cookies;
  if (token) {
    const {
      userId
    } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, (deets) => {
  console.log(`Server is now running on port http://localhost:${deets.port}   🚀`);
});
