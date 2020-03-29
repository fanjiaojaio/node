let express =require('express')
let router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('goods')
    res.end()
})


module.exports=router;