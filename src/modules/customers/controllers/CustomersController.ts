import { Request, Response } from "express";
import ListCustomersService from "../services/ListCustomersService";
import ShowCustomerService from "../services/ShowCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomersController{
  public async index(req:Request, res: Response){
    const listCustomersService = new ListCustomersService();
    const customers = await listCustomersService.execute();

    return res.status(200).json(customers);
  }

  public async show(req:Request, res: Response){
    const {id} = req.params;
    const showCustomerService = new ShowCustomerService();
    const customer = await showCustomerService.execute({id});

    return res.status(200).json(customer);
  }

  public async create(req:Request, res: Response){

    const {name, email} = req.body;
    const createCustomerService = new CreateCustomerService();
    const customer = await createCustomerService.execute({ name, email});

    return res.status(201).json(customer);
  }

  public async delete(req:Request, res: Response){

    const {id} = req.params;
    const deleteCustomerService = new DeleteCustomerService();
    await deleteCustomerService.execute({id});

    return res.status(204).end();
  }

  public async update(req:Request, res: Response){

    const {id} = req.params;
    const {name, email} = req.body;
    const updateCustomerService = new UpdateCustomerService();
    const updatedCustomer = await updateCustomerService.execute({id, name, email});

    return res.status(200).json(updatedCustomer);
  }
}
