import customersRouter from "@modules/customers/routes/customersRoutes";
import ordersRouter from "@modules/orders/routes/orderRoutes";
import productsRouter from "@modules/products/routes/productsRoutes";
import userProfileRouter from "@modules/users/routes/profileRoutes";
import sessionRouter from "@modules/users/routes/sessionsRoutes";
import usersRouter from "@modules/users/routes/usersRoutes";
import { Router } from "express";

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/profile', userProfileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
