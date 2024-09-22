const Order = require('../models/order');
const jwt = require('jsonwebtoken');

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

    const newOrder = new Order({
      ...req.body,
      userId: decoded.id,
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (err) {
    console.error("Error in createOrder:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
