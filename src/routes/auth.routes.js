const express=require('express'); 
const router=express.Router();
const {PrismaClient}=require('@prisma/client'); 
const prisma=new PrismaClient(); 
const bcrypt=require('bcryptjs'); 
const jwt=require('jsonwebtoken');

router.post('/register', async(req,res)=>{
 try{
  const {email,password,name}=req.body; 
  const hash=await bcrypt.hash(password,10); 
  const u=await prisma.user.create({data:{email,password:hash,name}}); 
  res.json(u);
 }catch(e){ res.status(400).json({error:e.message}) }
});

router.post('/login', async(req,res)=>{
 const {email,password}=req.body; 
 const u=await prisma.user.findUnique({where:{email}}); 
 if(!u) return res.status(401).json({message:'no user'}); 
 const ok=await bcrypt.compare(password,u.password); 
 if(!ok) return res.status(401).json({message:'wrong pass'}); 
 const token=jwt.sign({id:u.id,email:u.email}, process.env.JWT_SECRET||'rahasia'); 
 res.json({token}); 
});
module.exports=router;
