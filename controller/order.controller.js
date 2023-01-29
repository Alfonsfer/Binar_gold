const {OrderItem, Order} = require('../database/models')
const ErrorResponse = require('../helpers/error.helper')
const ResponseFormat = require('../helpers/response.helper')
const { validate } = require('../validation/schemas/createItem.schema')
const CreateOrderSchema = require('../validation/schemas/createOrder.schema')

class OrderController{
    async getOrderItems(req,res,next){
        try {
            const {
                user: {user_id,username},
                params:{id:Order_id}
            } = req
            
            const order = await Order.findAll({
                where:{
                    id:Order_id,
                    user_id
                },
                include: [{
                    model: OrderItem,
                    attributes: ['id','item_id','qty','price']
                }]
            })
    
            if(!order){
                throw new ErrorResponse(404,"Order doesn't exist")
            }
    
            return new ResponseFormat(res, 200, order )
        } catch (error) {
            next(error)
        }
    }

    
    async getOrders(req,res,next){
        try {
            const {
                user:{user_id,username},
                params: {id:order_id}
            } = req

            const order = await Order.findAll({
                where: {
                    user_id
                }
            })
    
            if (!order){
                throw new ErrorResponse(400, 'There is no orders')
            }
    
            return new ResponseFormat(res,200,order)
        } catch (error) {
            next(error)
        }

    }

    async createOrder(req,res,next){
        try {
            const {
                user:{user_id,username},
                body:{total}
            } = req
    
            const order = await Order.create({
                user_id,
                total,
            })
    
            return new ResponseFormat(res,200,order)
    
        } catch (error) {
            next(error)
        }
    }

    async updateOrder(req,res,next){
        try {
            const {
                user:{user_id,username},
                params:{id: order_id}
            }= req

            const order = await Order.update(req.body,{
                where:{
                    id: item_id
                }
            })

            if(!order){
                throw new ErrorResponse(404,'Order Not Found')
            }

            return new ResponseFormat(res,200,order)

        } catch (error) {
            next(error)
        }
    }
}


module.exports = {OrderController}