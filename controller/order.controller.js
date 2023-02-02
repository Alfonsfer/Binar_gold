const {OrderItem, Order, Item} = require('../database/models')
const ErrorResponse = require('../helpers/error.helper')
const ResponseFormat = require('../helpers/response.helper')
const { validate } = require('../validation/schemas/createItem.schema')
//const CreateOrderSchema = require('../validation/schemas/createOrder.schema')

class OrderController{
    async getOrders(req,res,next){
        try {
            const {
                user:{user_id},
                query:{status}
            } = req

            let queryObject= {user_id:user_id}
            if(status){
                queryObject.status = status
            }

            const order = await Order.findAll({
                where: {
                    ...queryObject,
                },
                attributes: ['id','total','status'],
                include: {
                    model: OrderItem,
                    attributes: ['id','item_id','qty','price'],
                    include: {
                        model: Item,
                        attributes: ['name']
                    }
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
            const { user:{user_id} } = req
            
            const orderItems = req.body.data

            let total = 0
            
            let order = await Order.create({
                user_id:user_id,
                total: total,
            })
            
            const order_id = order.id
            
            orderItems.forEach(element => {
                element.order_id = order_id,
                element.user_id = 
                total += (element.qty * element.price)
            })
            
            const orderItem = await OrderItem.bulkCreate(orderItems)

            await Order.update({total},{
                where:{
                    id:order_id,
                    user_id:user_id
                }
            })

            return new ResponseFormat(res,200,order)
    
        } catch (error) {
            next(error)
        }
    }

    async updateOrder(req,res,next){
        try {
            const {
                user:{user_id},
                params:{id:order_id},
                body:{status}
            } = req

            let order = await Order.findOne({
                where: {
                    id:order_id,
                    user_id
                },
                include: {
                    model: OrderItem,
                    attributes: ['id','item_id','qty','price'],
                    include: {
                        model: Item,
                        attributes: ['name']
                    }
                }
            })

            if(!order){
                throw new ErrorResponse(404,`Order Not Found`)
            }

            await order.update({status},{
                where: {
                    id:order_id,
                    user_id
                }
            })

            return new ResponseFormat(res,200,order)

        } catch (error) {
            next(error)
        }
    }

    async deleteOrder(req,res,next){
        try {
            const {
                user:{user_id},
                params:{id:order_id},
            } = req
            
            const order = await Order.update({status:'Cancelled'},{
                where:{
                    id:order_id,
                    user_id
                }
            })

            await OrderItem.destroy({
                where: {
                    user_id,
                    id:order_id
                }
            })
    
            await Order.destroy({
                where: {
                    user_id,
                    id:order_id
                }
            })
            
            return new ResponseFormat(res,200,'Order deleted')
        } catch (error) {
            next(error)
        }
        
    }
}


module.exports = {OrderController}