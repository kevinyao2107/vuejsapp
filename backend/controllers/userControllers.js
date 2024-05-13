import User from '../modals/userModals.js';
import { hashPassword, verifyPssword } from '../utilities/hashPassword.js';
import generateToken from '../utilities/jsonWebToken.js';

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error('Email deja utilisé');
    }

    const passhash = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: passhash,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.username,
        email: user.email,
        password: user.password,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const auth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await verifyPssword(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `Une erreur s'est produite`,
    });
  }
};

const UserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findById(req.user.id);

    if (user) {
      user.username = username;
      user.email = email;
      if (password !== undefined) {
        const passhash = await hashPassword(password);
        user.password = passhash;
      }

      await user.save();
      res.status(201).json({
        _id: user._id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'utilisateur introuvable',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { updateUsers, register, auth, UserProfile, getUsersById };
