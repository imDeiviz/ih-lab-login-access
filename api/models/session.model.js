const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // 1 hour
  },
  lastAccess: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
