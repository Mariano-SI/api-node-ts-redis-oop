import productsRouter from "@modules/products/routes/productsRoutes";
import sessionRouter from "@modules/users/routes/sessionsRoutes";
import usersRouter from "@modules/users/routes/usersRoutes";
import { Router } from "express";

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;
