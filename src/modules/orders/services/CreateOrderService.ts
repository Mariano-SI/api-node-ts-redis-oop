import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../repositories/OrdersRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";

interface IProduct{
  id: string,
  quantity: number
}

interface IRequest{
  customer_id: string,
  products:IProduct[],
}

export default class CreateOrderService{
  public async execute({customer_id, products}:IRequest):Promise<Order>{
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);
    const productsToSave = []

    if(!customerExists){
      throw new AppError("Cliente não encontrado", 404);
    }

    for (const product of products) {
      const productExists = await productsRepository.findById(product.id);
      if(!productExists){
        throw new AppError("Produto não encontrado", 404);
      }

      if(productExists.quantity <= product.quantity){
        throw new AppError("Estoque insuficiente", 401);
      }
      productsToSave.push({
        product_id : product.id,
        price : productExists.price,
        quantity : product.quantity,
      });
    }

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: productsToSave
    });

    const {order_products} = order;

    const updatedQuantity = order_products.map((orderProduct) =>{
      const complatibleProduct = products.find((product) => product.id === orderProduct.id);
      const quantityToDiscount = complatibleProduct && complatibleProduct.quantity;

      return {
        id: orderProduct.id,
        quantity: orderProduct.quantity - (quantityToDiscount ? quantityToDiscount: 0)
      }
    });

    await productsRepository.save(updatedQuantity);

    return order;
  }
}
