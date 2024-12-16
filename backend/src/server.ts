import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";

const app = Fastify({ logger: true });

const start = async () => {
  await app.register(cors);
  await app.register(routes);

  try {
    const port = 3333;
    const address = "127.0.0.1";
    await app.listen(port, address);
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
