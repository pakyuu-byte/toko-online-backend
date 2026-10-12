const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getProducts = async (req,res)=>{ try{ const p=await prisma.product.findMany(); res.json(p);}catch(e){res.status(500).json(e);} };
exports.getProductById = async (req,res)=>{ try{ const p=await prisma.product.findUnique({where:{id:Number(req.params.id)}}); res.json(p);}catch(e){res.status(500).json(e);} };
exports.createProduct = async (req,res)=>{ try{ const p=await prisma.product.create({data:req.body}); res.json(p);}catch(e){res.status(500).json(e);} };
exports.updateProduct = async (req,res)=>{ try{ const p=await prisma.product.update({where:{id:Number(req.params.id)}, data:req.body}); res.json(p);}catch(e){res.status(500).json(e);} };
exports.deleteProduct = async (req,res)=>{ try{ await prisma.product.delete({where:{id:Number(req.params.id)}}); res.json({message:'deleted'});}catch(e){res.status(500).json(e);} };
