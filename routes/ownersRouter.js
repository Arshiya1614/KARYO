const express = require("express");
const router = express.Router();
const model = require("../models/ownersModel");
const ownersModel = require("../models/ownersModel");

router.get("/", (req, res) => {
  res.send("hey router working");
});

//  console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownersModel.find();
    if (owners.length > 0) {
      return res
        .send(503)
        .send("you don't have permission to create a new owner");
    }
    
    let { fullname,
      email,
      password} = req.body;

    let createdOwner = await ownersModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner);
  });
}

module.exports = router;
