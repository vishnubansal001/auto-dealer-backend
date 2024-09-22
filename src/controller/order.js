const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/order.js");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('unitId');
    return res.status(200).json({ orders });
  } catch (err) {
    console.error("Error in getAllOrders:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('unitId');
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    return res.status(200).json({ order });
  } catch (err) {
    console.error("Error in getSingleOrder:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
