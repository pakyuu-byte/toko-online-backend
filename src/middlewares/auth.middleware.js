const jwt = require('jsonwebtoken');
function auth(req,res,next){
 const h=req.headers.authorization;
 if(!h) return res.status(401).json({message:'No token'});
 const t=h.split(' ')[1];
 try{ req.user=jwt.verify(t, process.env.JWT_SECRET||'rahasia'); next(); }
 catch{ return res.status(401).json({message:'Invalid token'}); }
}
module.exports=auth;
