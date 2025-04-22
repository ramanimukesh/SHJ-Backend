const express = require("express");
const router = express.Router();
const {userContact, getContact, userVendor, getVendor} = require("../controller/contact");

router.post("/userContact", userContact);
router.get("/getcontact", getContact);

module.exports = router;