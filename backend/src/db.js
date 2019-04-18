//this file connects to the remote prisma DB and gives the ability to query it with js

const {
  Prisma
} = require('prisma-binding');

const db = new Prisma ({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true,
})

module.exports= db;
