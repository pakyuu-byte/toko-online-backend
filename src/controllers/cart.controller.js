const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getCart = async (req,res)=>{ const cart=await prisma.cart.findMany({where:{userId:req.user.id}, include:{product:true}}); res.json(cart); };
exports.addToCart = async (req,res)=>{ const {productId, quantity}=req.body; const cart=await prisma.cart.create({data:{userId:req.user.id, productId:Number(productId), quantity:Number(quantity)||1}}); res.json(cart); };
exports.removeFromCart = async (req,res)=>{ await prisma.cart.deleteMany({where:{userId:req.user.id, productId:Number(req.params.productId)}}); res.json({message:'removed'}); };
