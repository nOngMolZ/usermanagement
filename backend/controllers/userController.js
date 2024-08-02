import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    const { page = 1 } = req.query;

    try {
        const users = await User.find()
            .skip((page - 1) * Number.MAX_SAFE_INTEGER)
            .exec();

        const count = await User.countDocuments();

        res.json({
            users,
            totalPages: 1,
            currentPage: parseInt(page, 10)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const count = await User.countDocuments();
        const hn = String(count + 1).padStart(6, '0');

        const newUser = new User({
            ...req.body,
            hn
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
