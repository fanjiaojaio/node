module.exports=(req,res,next)=>{
    req.query._page = req.query._page ? req.query._page -1 : require('../../config/global')._page-0;
    req.query._limit = req.query._limit ? req.query._limit -0 : require('../../config/global')._limit-0;
    req.query.q = req.query.q ? req.query.q  : require('../../config/global').q;
    req.query._sort = req.query._sort ? req.query._sort : require('../../config/global')._sort;

    req.body._page = req.body._page ? req.body._page -1 : require('../../config/global')._page-0;
    req.body._limit = req.body._limit ? req.body._limit -0 : require('../../config/global')._limit-0;
    req.body.q = req.body.q ? req.body.q  : require('../../config/global').q;
    req.body._sort = req.body._sort ? req.body._sort : require('../../config/global')._sort;

    req.headers._page = req.headers._page ? req.headers._page -1 : require('../../config/global')._page-0;
    req.headers._limit = req.headers._limit ? req.headers._limit -0 : require('../../config/global')._limit-0;
    req.headers.q = req.headers.q ? req.headers.q  : require('../../config/global').q;
    req.headers._sort = req.headers._sort ? req.headers._sort : require('../../config/global')._sort;

    next()
}