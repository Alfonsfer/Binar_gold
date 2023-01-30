const jwt = require("jsonwebtoken")
const { Op } = require("sequelize")
const {Item, User} = require("../database/models")
const ErrorResponse = require("../helpers/error.helper")
const ResponseFormat = require("../helpers/response.helper")
const validate = require("../middleware/validation")
const createItemSchema = require("../validation/schemas/createItem.schema")

class ItemController{
    async getItems(req,res,next){
        try {
            const {name, sort, numericFilters} = req.query
            let queryObject = {}
            
            if(name){
                queryObject.name = {[Op.startsWith]: name}
            }

            // if(numericFilters){
            //     const operatorMap = {
            //         '>': Op.gt,
            //         '>=': Op.gte,
            //         '=': Op.eq,
            //         '<': Op.lt,
            //         '<=': Op.lte,
            //     };
            //     const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            //     let filters = numericFilters.replace(
            //         regEx,
            //         (match) => `-${operatorMap[match]}-`
            //         );
            //     const options = ['price', 'stock'];
            //     filters = filters.split(',').forEach((item) => {
            //         const [field, operator, value] = item.split('-');
            //         if (options.includes(field)) {
            //             queryObject[field] = { [operator] : Number(value) };
            //         }
            //     });
            // }
            
            let sortList = []
            if(sort){
                const field = sort.split(',').forEach((data) => {
                    sortList.push([data,'DESC'])
                })
                // sortList =  [[col1,'desc'],[col2,'desc]]
            }else{
                sortList.push(['created_at','DESC'])
            }
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            
            let items = await Item.findAll({
                where:{
                    name: queryObject.name,
                    price: queryObject.price,
                    stock: queryObject.stock
                },
                order: sortList,
                limit: limit,
                offset: skip,
                //attributes: [id, name, price, stock],
                include: {
                    model: User,
                    attributes: ['id','username','email']
                }
            })

            if(items.length===0){
                throw new ErrorResponse(404,"No Items Found")
            }

            return new ResponseFormat(res,200,item)
        } catch (error) {
            next(error)
        }
    }

    async createItem(req,res,next){
        try {
            const {
                user:{user_id,username},
                body:{name, price, stock}
            } = req
            // const token = await jwt.decode()

            await validate(createItemSchema, req.body)

            const item = await Item.create({
                user_id: user_id,
                name,
                price,
                stock
            })

            return new ResponseFormat(res, 201, item)

        } catch (error) {
            next(error)
        }

    }

    async getItem(req,res,next){
        try {
            const {id: item_id} = req.params
            
            const item = await Item.findAll({
                where: {
                    id: parseInt(item_id)
                },
                include: [{
                    model: User,
                    attributes: ['id','username','email']
                }]
            })
            
            return new ResponseFormat(res, 200, item)
        } catch (error) {
            next(error)
        }
    }

    async updateItem(req,res,next){
        try {
            const {id: item_id} = req.params

            const item = await Item.update(req.body,{
                where:{
                    id: item_id
                }
            })

            if(!item){
                throw new ErrorResponse(404,'Item Not Found')
            }

            return new ResponseFormat(res, 200, item)

        } catch (error) {
            next(error)
        }
    }

    async deleteItem(req,res,next){
        try {
            const {id:item_id} = req.params
            
            const item = await Item.destroy({
                where: {
                    id: item_id
                }
            })

            if(!item){
                throw new ErrorResponse(404,'Item Not Found')
            }

            return new ResponseFormat(res,200,'Item deleted')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {ItemController}