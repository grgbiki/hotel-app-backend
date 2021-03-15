import mongoose from 'mongoose';

import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: "Password is required"
    },
    phone: {
        type: String,
        required: "Phone number is required"
    },
    address: {
        type: String,
        required: "Address is required"
    },
    message: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified || !user.isNew) { // don't rehash if it's an old user
        next();
    } else {
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) {
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

module.exports = mongoose.model('User', UserSchema);