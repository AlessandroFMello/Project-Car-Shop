// import CustomRouter from './routes/Router';
import App from './app';

// import exampleController from './controllers/controller-example';

// import { example } from './interfaces/ExampleInterface';

import CarsController from './controllers/CarsController';
import MotorcycleController from './controllers/MotorcycleController';
import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import CustomRouter from './routes/CustomRouter';

const server = new App();

const carsController = new CarsController();
const carsRouter = new CustomRouter<Car>();
carsRouter.addRoute(carsController);

const motorcyclesController = new MotorcycleController();
const motorcycleRouter = new CustomRouter<Motorcycle>();
motorcycleRouter.addRoute(motorcyclesController);

server.addRouter(carsRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;
