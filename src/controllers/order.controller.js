const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.checkout = async (req,res)=>{
  const carts=await prisma.cart.findMany({where:{userId:req.user.id}, include:{product:true}});
  if(!carts.length) return res.status(400).json({message:'Cart empty'});
  let total=carts.reduce((s,c)=>s+(c.product.price*c.quantity),0);
  const order=await prisma.order.create({data:{userId:req.user.id, total, status:'PENDING', items:{create:carts.map(c=>({productId:c.productId, quantity:c.quantity, price:c.product.price}))}}});
  await prisma.cart.deleteMany({where:{userId:req.user.id}});
  res.json(order);
};
exports.myOrders = async (req,res)=>{ const o=await prisma.order.findMany({where:{userId:req.user.id}, include:{items:true}}); res.json(o); };
