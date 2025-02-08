const Session = require('../models/session.model');

module.exports = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  Session.findById(req.session.userId)
    .then(session => {
      if (!session) {
        return res.status(401).json({ message: 'No autorizado' });
      }
      req.user = session.userId;
      next();
    })
    .catch(err => next(err));
};