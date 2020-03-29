let jwt =require('jsonwebtoken');
module.exports={
    //生成签名
    sign:({username,_id})=>{
        return jwt.sign({username,_id},'NZ1909',{expiresIn:60*60*24}) //过期时间以秒计算
    },

    //校验签名
    verify:(token)=>{
        return new Promise((resolve,reject)=>{
            jwt.verify(token, 'NZ1909', (err,decode)=>{
                if(!err){
                    resolve(decode)
                }else{
                    reject(err.message)
                }
            })
        })
    }

}