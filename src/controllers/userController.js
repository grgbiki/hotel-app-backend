import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getToken = (userId) => {
    return jwt.sign(userId, process.env.TOKEN_SECRET, { expiresIn: '360d' });
}

const User = mongoose.model('User', UserSchema);

export const register = (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        const token = getToken({ "id": user._id });
        res.writeHead(200, { 'authorization': token });
        res.end();
    });
}

export const login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        if (!user) {
            res.status(401).send({ message: "Invalid email or password" });
        } else {
            bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (err) {
                    res.status(500).send({ message: err });
                }
                if (match) {
                    const token = getToken({ "id": user._id });
                    res.writeHead(200, { 'authorization': token });
                    res.end();
                } else {
                    res.status(401).send({ message: "Invalid email or password" });
                }
            });
        }
    });
}