const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/order.js");
const User = require("../models/user.js");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({ orders });
  } catch (err) {
    console.error("Error in getAllOrders:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
