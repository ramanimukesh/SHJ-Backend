const { Contact, Vendor } = require("../model/contact");

const nodemailer = require("nodemailer");
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const userContact = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const register = new Contact({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      project: req.body.project,
      media: req.body.media,
      zip: req.body.zip,
      address: req.body.address,
      message: req.body.message,
    });

    const userdata = await register.save();
    console.log("Saved Contact Data:", userdata);

    // Email content with bold formatting
    const mailOptions = {
      from: `"${req.body.name} ${req.body.lastname}" <${req.body.email}>`,
      to: "swaminarayanconstructionllc@gmail.com", // Replace with your company's email
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${req.body.name} ${req.body.lastname}</p>
        <p><b>Email:</b> ${req.body.email}</p>
        <p><b>Phone:</b> ${req.body.phone}</p>
        <p><b>Service:</b> ${req.body.service}</p>
        <p><b>Project Timeline:</b> ${req.body.project}</p>
        <p><b>Media Source:</b> ${req.body.media}</p>
        <p><b>Address:</b> ${req.body.address}</p>
        <p><b>Zip Code:</b> ${req.body.zip}</p>
        <p><b>Message:</b> ${req.body.message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({
      success: true,
      data: userdata,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error saving contact or sending email:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

const userVendor = async (req, res) => {
  try {
    console.log("Received Vendor Request:", req.body);

    const vendor = new Vendor({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      message: req.body.message,
      service: req.body.service,
      media: req.body.media,
    });

    const vendorData = await vendor.save();
    console.log("Saved Vendor Data:", vendorData);

    // Email content for vendor registration
    const mailOptions = {
      from: `"${req.body.name}" <${process.env.EMAIL_USER}>`,
      to: "swaminarayanconstructionllc@gmail.com", // Replace with your company email
      subject: "New Vendor Registration",
      html: `
        <h2>New Vendor Registration</h2>
        <p><b>Name:</b> ${req.body.name} ${req.body.lastname}</p>
        <p><b>Email:</b> ${req.body.email}</p>
        <p><b>Phone:</b> ${req.body.phone}</p>
        <p><b>Address:</b> ${req.body.address}</p>
        <p><b>Service:</b> ${req.body.service}</p>
        <p><b>Media Source:</b> ${req.body.media}</p>
        <p><b>Message:</b> ${req.body.message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      data: vendorData,
      message: "Vendor registration successful and email sent!",
    });
  } catch (error) {
    console.error("Error registering vendor or sending email:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

const getVendor = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = { userContact, getContact, userVendor, getVendor };


