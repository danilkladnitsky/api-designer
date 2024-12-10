import { IServiceInstance } from "@/common/services";
import {
  createTaskController,
  ITaskController,
} from "./controllers/task.controller";
import {
  createTaskModule,
  ITaskModuleConstructor,
} from "./modules/task-module/task-module";
import { createLocalDatabase } from "./adapters/database/local/database.local";
import { startHttpServer } from "@/app/http/server";

const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];

const instantiateDatabase = async () => {
  const db = await createLocalDatabase();
  await db.connect();

  return db;
};

const instantiateModules = async ({ database }: ITaskModuleConstructor) => {
  const taskModule = createTaskModule({ database });

  return { taskModule };
};

const instantiateControllers = async ({ taskModule }: ITaskController) => {
  const taskController = createTaskController({ taskModule });

  return {
    httpHandlers: [...taskController.httpHandlers],
  };
};

const startApp = async () => {
  const services: IServiceInstance[] = [];

  const database = await instantiateDatabase();
  services.push({ name: "database", close: database.close });

  const { httpHandlers } = await instantiateModules({ database }).then(
    ({ taskModule }) => instantiateControllers({ taskModule })
  );

  try {
    const httpServer = startHttpServer({
      port: 3000,
      handlers: httpHandlers,
    });
    services.push(httpServer);
    addGracefulShutdown(services);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const addGracefulShutdown = (services: IServiceInstance[]) => {
  signals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        const closeRequests = services.map((_, idx, serviceList) => {
          const service = serviceList[serviceList.length - idx - 1];

          return service
            .close()
            .then((msg) => {
              console.info(`Closed service "${service.name}"`);
              return msg;
            })
            .catch((msg) => msg);
        });

        const shutdownStatus = await Promise.allSettled(closeRequests);

        console.log(shutdownStatus);
        process.exit(0);
      } catch (err) {
        console.error(`Error closing application on ${signal}`, err);
        process.exit(1);
      }
    });
  });
};

startApp();
