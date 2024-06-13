const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const jwt_secret = process.env.JWT_SECRET

exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide a username and password' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide a username and password' });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, jwt_secret, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.user = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.execute('SELECT id,username FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};