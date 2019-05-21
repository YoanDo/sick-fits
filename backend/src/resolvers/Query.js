const {
  forwardTo
} = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, info) {
    // check if there is a current user od
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({
      where: {
        id: ctx.request.userId
      }
    }, info)
  }
};

module.exports = Query
