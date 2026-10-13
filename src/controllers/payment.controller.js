const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const snap = require('../config/midtrans');

const createPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.body;
    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
      include: { items: { include: { product: true } }, user: true }
    });
    if (!order) return res.status(404).json({ message: "Order tidak ditemukan" });
    
    const midtransOrderId = `TRX-${order.id}-${Date.now()}`;
    let parameter = {
      transaction_details: { order_id: midtransOrderId, gross_amount: order.total },
      customer_details: { first_name: order.user.name || "Customer", email: order.user.email },
      item_details: order.items.map(item => ({
        id: item.productId.toString(),
        price: item.price,
        quantity: item.quantity,
        name: item.product.name.substring(0, 50)
      }))
    };
    const token = await snap.createTransactionToken(parameter);
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        midtransOrderId,
        snapToken: token,
        snapRedirectUrl: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${token}`,
        status: "WAITING_PAYMENT"
      }
    });
    res.json({ message: "Payment token created", snapToken: token, order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal buat payment", error: err.message });
  }
};

const midtransWebhook = async (req, res) => {
  try {
    const { order_id, transaction_status } = req.body;
    let newStatus = "PENDING";
    if (transaction_status == "settlement" || transaction_status == "capture") newStatus = "PAID";
    if (transaction_status == "pending") newStatus = "WAITING_PAYMENT";
    if (["deny","expire","cancel"].includes(transaction_status)) newStatus = "FAILED";
    await prisma.order.update({ where: { midtransOrderId: order_id }, data: { status: newStatus } });
    res.status(200).json({ message: "Webhook OK" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPayment, midtransWebhook };
