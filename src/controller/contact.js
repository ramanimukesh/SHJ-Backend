const Contact = require("../model/contact");
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
      to: "company-email@company.com", // Replace with your company's email
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

module.exports = { userContact, getContact };
