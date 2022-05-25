// import CustomRouter from './routes/Router';
import App from './app';

// import exampleController from './controllers/controller-example';

// import { example } from './interfaces/ExampleInterface';

import CarsController from './controllers/CarsController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/CustomRouter';

const server = new App();

const carsController = new CarsController();
// const exampleController = new exampleController();

// const exampleRouter = new CustomRouter<Car>();
// exampleRouter.addRoute(exampleController);

const carsRouter = new CustomRouter<Car>();
carsRouter.addRoute(carsController);

// server.addRouter(exampleRouter.router);

server.addRouter(carsRouter.router);

export default server;
