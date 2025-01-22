import { Router } from "express";
import CustomersController from "../controllers/CustomersController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated)
customersRouter.get("/", customersController.index)
customersRouter.get("/:id", customersController.show)
customersRouter.post("/", customersController.create)
customersRouter.put("/:id", customersController.update)
customersRouter.delete("/:id", customersController.delete)

export default customersRouter;
