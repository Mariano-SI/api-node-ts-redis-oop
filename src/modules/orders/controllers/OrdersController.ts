import { Request, Response } from "express";
import ShowOrderService from "../services/ShowOrderService";
import CreateOrderService from "../services/CreateOrderService";
import { canShowOrder } from "../common/validators";


export default class OrdersController{

  public async show(req:Request, res: Response){
    const {id} = req.params;

    await canShowOrder(req);

    const showOrderService = new ShowOrderService();
    const order = await showOrderService.execute({id});

    return res.status(200).json(order);
  }

  public async create(req:Request, res: Response){
    const {customerId, products} = req.body;

    const createOrderService = new CreateOrderService();
    const order = await createOrderService.execute({
      customer_id: customerId,
      products
    });

    return res.status(201).json(order);
  }

}
