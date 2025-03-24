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
    service: {
        type: String,
        enum: ['Kitchen Remodeling', 'Bathroom Remodeling', 'Laundry Room Remodeling', 'Flooring', 'Quartz'], 
        required: [true, 'selection is required'],
    },
    project: {
        type: String,
        enum: ['0 - 3 Months', '3 - 6 Months', '+6 Months'], // Example options
        required: [true, 'selection is required'],
    },
    media: {
        type: String,
        enum: ['Social Media', 'Google', 'Referral', 'Magazine',  'Others'], // Example options
        required: [true, 'selection is required'],
    },

    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    zip: {
        type: String,
        required: [true, 'Zip is required'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    }
}, { timestamps: { createdAt: true, updatedAt: false }});


const vendorSchema = new mongoose.Schema({
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
   address: {
        type: String,
        required: false
   },
   message: {
       type: String,
       required: false
  },
   media: {
       type: String,
       enum: ['Social Media', 'Google', 'Referral', 'Magazine',  'Others'], // Example options
       required: [true, 'selection is required'],
   },
   service: {
        type: [String],
        enum: ['Plumber', 'Electrician', 'Tiling', 'Flooring', 'Roofing', 'Drywall', 'Paint', 'Trim Work', 'Other'], 
        required: [true, 'selection is required'],
    }
}, { timestamps: { createdAt: true, updatedAt: false }});


const Contact = mongoose.model('Contact', contactSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = {Contact, Vendor};
