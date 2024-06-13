const db = require('../config/db');

exports.createProfile = async (req, res) => {
    const { name, email, bio } = req.body;
    const userId = req.user.id;

    try {
        await db.execute('INSERT INTO profiles (user_id, name, email, bio) VALUES (?, ?, ?, ?)', [userId, name, email, bio]);
        res.status(201).json({ message: 'Profile created' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.execute('SELECT * FROM profiles WHERE user_id = ?', [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateProfile = async (req, res) => {
    const { name, email, bio } = req.body;
    const userId = req.user.id;

    try {
        const [result] = await db.execute('UPDATE profiles SET name = ?, email = ?, bio = ? WHERE user_id = ?', [name, email, bio, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const [result] = await db.execute('DELETE FROM profiles WHERE user_id = ?', [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
