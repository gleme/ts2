function injectRepository(model) {
  return function(req, res, next) {
    try {
      const repository = req.app.locals.mysqlDb.getRepository(model);
      req.app.locals.repository = repository;
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  injectRepository: injectRepository
};
