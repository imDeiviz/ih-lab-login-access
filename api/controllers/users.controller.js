const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validar que se proporcionen name, email y password
    if (!name || !email || !password) {
      throw createError(400, "Name, email y password son requeridos");
    }

    // Crear un nuevo usuario
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    next(error);
  }
};

module.exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.create({ name, email, password, role });
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      next(createError(400, "El email ya está registrado"));
    } else {
      next(error);
    }
  }
};

module.exports.profile = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "No autorizado" });
  }

  User.findById(req.session.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json({ email: user.email }); // Retornar solo el email por razones de seguridad
    })
    .catch(err => next(err));
};

module.exports.getProfile = (req, res, next) => {
  res.status(200).json(req.user);
};

exports.user = (req, res) => {
  // Your logic for handling the user creation
  res.send('User created');
};

exports.profile = (req, res) => {
  // Your logic for handling the user profile
  res.send('User profile');
};
