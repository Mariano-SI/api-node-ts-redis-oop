import { createConnection } from "typeorm";

createConnection().then(() => console.log("Database connected!")).catch(() => console.log("Erro ao conectar no banco de dados"));
