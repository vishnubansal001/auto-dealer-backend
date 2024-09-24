const Order = require('../models/order');
const jwt = require('jsonwebtoken');
const Unit = require('../models/unit');
const User = require('../models/user');

exports.createOrder = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        return res.status(401).json({ message: "Access Denied: Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(req.body.unitId == null){
        return res.status(400).json({ message: "Unit ID is required" });
    }

    const unit = await Unit.findById(req.body.unitId);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const newOrder = new Order({
      ...req.body,
      userId: decoded.id,
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({ message: "Order created successfully", order: savedOrder, unit });
  } catch (err) {
    console.error("Error in createOrder:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
