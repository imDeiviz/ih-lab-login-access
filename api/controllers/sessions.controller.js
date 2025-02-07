const Session = require("../models/session.model");
const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.create = async (req, res, next) => {
  const { email, password } = req.body;

  // 1. find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(401, "Credenciales inválidas"));
  }

  // 2. check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(createError(401, "Credenciales inválidas"));
  }

  // 3. create session
  const session = new Session({ userId: user._id });
  await session.save();

  // 4. send session id in a cookie
  res.header("Set-Cookie", `session_id=${session._id}; HttpOnly`);

  res.json({ message: "Inicio de sesión exitoso" });
};

module.exports.destroy = (req, res, next) => {
  // access current request session. remove and send 204 status
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return next(err);
      }
      res.clearCookie("session_id");
      res.status(204).send();
    });
  } else {
    res.status(204).send();
  }
};
