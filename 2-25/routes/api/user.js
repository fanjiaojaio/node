let express =require('express')
let router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('user',req.query._page,req.body._limit,req.headers.q)
    res.end()
})


module.exports=router;