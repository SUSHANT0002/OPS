const { registerUser, loginUser, refreshAccessToken } = require("../services/authService");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { user, tokens } = await registerUser(name, email, password);
    res.status(201).json({ user, tokens });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, tokens } = await loginUser(email, password);
    res.status(200).json({ user, tokens });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await refreshAccessToken(refreshToken);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, refreshToken };
