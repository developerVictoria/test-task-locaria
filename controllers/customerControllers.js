const {getInformationAboutClient,  getInformationAboutOrder} = require('../utils/customerUtils')
const {generateAccessToken} = require('../middleware/protectRoutes');

const Redis =require('ioredis');
const redisClient = new Redis();


const authorizeUser = async (req, res)=>{
    const token = generateAccessToken(req.params.userId);
    res.json(token);
}

const getSummary = async (req, res) => {
    try{
        const cacheResults = await redisClient.get(req.params.userId);
        if(cacheResults){
            res.json(JSON.parse(cacheResults));
        }else{
            let clientInfo = {
                'address': 'not provided',
                'billing_info':'not provided',
                'invocies':'not provided',
                'orders':['not provided'],
                'jobs': ['not provided'],
                'delivery_info':['not provided']
            }
            //get address
            console.log(await getInformationAboutClient(`${process.env.FINANCERO_CUSTOMERS_URL}${req.params.customerId}/address`, 'address', true ))

            clientInfo['address'] = await getInformationAboutClient(`${process.env.FINANCERO_CUSTOMERS_URL}${req.params.customerId}/address`, 'address', true );
        
            //get billing info 
            clientInfo['billing_info'] =await getInformationAboutClient(`${process.env.FINANCERO_CUSTOMERS_URL}${req.params.customerId}/billing-info`, 'billing_info', false ) || 'no information found';
            
            //get invoices
            clientInfo['invocies'] =await getInformationAboutClient(`${process.env.FINANCERO_CUSTOMERS_INVOICES_URL}${req.params.customerId}/invoices`, 'invoices', true ) || 'no information found';
            
            //get orders, jobs, delivery
            clientInfo['orders'] =await getInformationAboutClient(`${process.env.ORDERINO_CUSTOMER_URL}${req.params.customerId}/orders`, 'orders', true );
    
            if(clientInfo['orders']!='not found' && clientInfo['orders']!=undefined ){
                let orderInfo = [];
                let jobsInfo = [];
                let deliveryInfo = [];
                clientInfo['orders'].forEach(async (order)=>
                {
                    orderInfo.push(await getInformationAboutOrder(`${process.env.ORDERINO_ORDERS_URL}${order.order_id}`));
                    orderInfo.push(await getInformationAboutOrder(`${process.env.ORDERINO_ORDERS_URL}${order.order_id}/jobs`));
                    orderInfo.push(await getInformationAboutOrder(`${process.env.ORDERINO_ORDERS_URL}${order.order_id}/delivery`));
                });
                clientInfo['orders'] = orderInfo;
                clientInfo['jobs'] = jobsInfo;
                clientInfo['delivery_info'] = deliveryInfo;
            }
        redisClient.set(req.params.userId, JSON.stringify(clientInfo));
        res.json(clientInfo);
        }

        
        
    }catch(err){
        res.status(404);
    }
       
}

module.exports = {getSummary, authorizeUser}