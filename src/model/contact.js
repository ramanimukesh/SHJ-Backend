const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: false, 
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    }
}, { timestamps: { createdAt: true, updatedAt: false }});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {Contact};
