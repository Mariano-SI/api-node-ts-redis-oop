import { Request, Response } from "express";
import ListProductsService from "../services/ListProductsService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default class ProductsController{
  public async index(req: Request, res: Response):Promise<Response>{
    const listProductsService = new ListProductsService();
    const products = await listProductsService.execute();

    return res.status(200).json(products);
  }

  public async show(req: Request, res: Response):Promise<Response>{
    const {id} = req.params;
    const showProductService = new ShowProductService();
    const product = await showProductService.execute({id});

    return res.status(200).json(product);
  }

  public async create(req: Request, res: Response):Promise<Response>{
    const {name, price, quantity} = req.body;
    const createProductService = new CreateProductService();
    const createdProduct = await createProductService.execute({name, price, quantity});

    return res.status(201).json(createdProduct);
  }

  public async update(req: Request, res: Response):Promise<Response>{
    const {id} = req.params;
    const {name, price, quantity} = req.body;

    const updateProductService = new UpdateProductService();
    const updatedProduct = await updateProductService.execute({id, name, price, quantity});

    return res.status(200).json(updateProductService);
  }

  public async delete(req: Request, res: Response):Promise<Response>{
    const {id} = req.params;

    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute({id});

    return res.status(204).end();
  }

}
