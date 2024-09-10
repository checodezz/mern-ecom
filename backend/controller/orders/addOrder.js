const Razorpay = require("razorpay");
const orderModel = require("../../models/orderModel");

async function addOrderController(req, res) {
  try {
    const sessionUserId = req.userId;

    // console.log(req.body.products);

    const payload = {
      name: req.body?.name,
      phoneNumber: req.body?.phoneNumber,
      address: req.body?.address,
      pincode: req.body?.pincode,
      amount: req.body?.amount,
      paymentId: req.body?.paymentId,
      userId: req.body?.userId,
      products: req.body?.products,
      date: req.body?.date,
    };

    const order = new orderModel(req.body);
    const savedOrder = await order.save();

    if (!savedOrder) {
      return res.status(500).send("Error");
    }

    res.status(200).json({
      data: savedOrder,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = addOrderController;
