const express = require("express");
const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

const router = express.Router();

// 📌 Create a new order (POST /api/orders)

router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming Order Data:", req.body);

    const { userid, name, email, orderAmount, cartItems, customer, transactionId } = req.body;

    if (!transactionId) {
      return res.status(400).json({ message: "❌ Transaction ID is required" });
    }

    // 🔍 Check if an order with this transactionId already exists
    let existingOrder = await Order.findOne({ transactionId });
    if (existingOrder) {
      return res.status(200).json(existingOrder); // ✅ Return existing order instead of error
    }

    const newOrder = new Order({
      userid,
      name,
      items,
      email,
      orderAmount,
      orderStatus: "Cooking Pending",
      cartItems,
      customer,
      transactionId,
    });

    const savedOrder = await newOrder.save();
    console.log("✅ Order placed:", savedOrder);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
});




// 📌 Fetch all orders (GET /api/orders)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log("📥 Fetching orders...");
    const orders = await Order.find().sort({ createdAt: -1 });

    if (!orders.length) return res.status(404).json({ message: "No orders found" });

    res.json(orders);
  })
);

// 📌 Get a single order by ID (GET /api/orders/:id)
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  })
);

// 📌 Update order status (PATCH /api/orders/:id)
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = orderStatus || order.orderStatus;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  })
);

router.get("/status/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ 
      _id: order._id, 
      email: order.email, 
      orderAmount: order.orderAmount, 
      createdAt: order.createdAt, 
      orderStatus: order.orderStatus ?? "Cooking Pending" // ✅ Ensures orderStatus is never undefined
    });

  } catch (error) {
    console.error("❌ Error fetching order status:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// 📌 Admin: Update Order Status (PATCH /api/orders/:id/update)
router.patch(
  "/:id/update",
  asyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      // 🔄 Update order status in sequence
      if (order.orderStatus === "Cooking Pending") {
        order.orderStatus = "Cooking";
      } else if (order.orderStatus === "Cooking") {
        order.orderStatus = "Out for Delivery";
      } else if (order.orderStatus === "Out for Delivery") {
        order.orderStatus = "Delivered";
      }

      await order.save();
      console.log(`✅ Order ${order._id} updated to ${order.orderStatus}`);

      // Emit event if WebSockets (io) is available
      if (typeof io !== "undefined") {
        io.emit("orderUpdated", await Order.find().sort({ createdAt: -1 }));
      }

      res.json({ message: "Order status updated", order });
    } catch (error) {
      console.error("❌ Error updating order:", error);
      res.status(500).json({ message: "Error updating order", error: error.message });
    }
  })
);

// 📌 Admin: Approve Order (PATCH /api/orders/:id/approve)
router.patch(
  "/:id/approve",
  asyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      order.orderStatus = "Approved"; // ✅ Fixed: Consistent naming
      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } catch (error) {
      console.error("❌ Error approving order:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  })
);

// 📌 Admin: Delete Order (DELETE /api/orders/:id)
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      await order.deleteOne();
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting order:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  })
);

// cancel an order
router.put("/:id/cancel", async(req,res)=> {
try { 
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json ({message: "order not found"});
  order.orderStatus = "Cancelled";
  await order.save();
  res.json({message: "Order cancelled", order});

}catch(error){
  res.status(500).json({message: "Error cancelling order"});
}

})



module.exports = router;
