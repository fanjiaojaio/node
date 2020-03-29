let express =require('express')
let router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('reg')
    res.end()
})


module.exports=router;