const User = require('../models/user');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {

    try {
        const { name, email, password, role } = req.body;

        // Check if the email is already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
            role
        });

        // Save the user to the database
        await newUser.save();

        const token = await newUser.generateAuthToken();

        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;
  
        res.status(201).json({ message: 'User registered', user: userWithoutPassword, token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');;
  
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        // const hash = await bcrypt.hash(password.trim(), 8);
        const isPasswordMatch = await bcrypt.compare(password.trim(), user.password);
  
        if (!isPasswordMatch) {
          return res.status(401).json({ message: 'Invalid password' });
        }
  
        const token = await user.generateAuthToken();

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
  
        res.json({ user:userWithoutPassword, token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

const updatePassword = async (req, res) => {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(userId).select('+password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the old password matches the stored hashed password
      const isPasswordMatch = await bcrypt.compare(oldPassword.trim(), user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Current password does not match' });
      }
  
      // Hash and update the new password
      user.password = newPassword;
  
      // Save the updated user with the new password
      await user.save();
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    signup,
    login,
    updatePassword
}