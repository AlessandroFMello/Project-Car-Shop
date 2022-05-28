import { Response, Request } from 'express';
import Controller, { RequestWithBody, ResponseError } from './Controller';
import CarsService from '../services/CarsService';
import { Car } from '../interfaces/CarInterface';

export default class CarsController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarsService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const newCar = await this.service.create(body);

    if (!newCar) {
      return res
        .status(400)
        .json({ error: this.errors.badRequest });
    }

    if ('error' in newCar) {
      return res.status(400).json(newCar);
    }

    return res.status(201).json(newCar);
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    const cars = await this.service.read();
      
    return res.status(200).json(cars);
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const hexadecimal = /[0-9A-Fa-f]{24}/g;

    if (!hexadecimal.test(id)) {
      return res
        .status(400)
        .json({ error: this.errors.requiredId });
    }

    const car = await this.service.readOne(id);

    if (!car) {
      return res.status(404).json({ error: this.errors.notFound });
    }
    return res.json(car);
  };

  update = async (
    req: Request<{ id: string }, Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    const hexadecimal = /[0-9A-Fa-f]{24}/g;

    if (!hexadecimal.test(req.params.id)) {
      return res
        .status(400).json({ error: this.errors.requiredId });
    }

    if (Object.keys(req.body).length === 0) {
      return res
        .status(400).json({ error: this.errors.badRequest });
    }

    const updatedCar = await this.service.update(id, body);

    return !updatedCar 
      ? res.status(404).json({ error: this.errors.notFound }) 
      : res.json(updatedCar);
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    const hexadecimal = /[0-9A-Fa-f]{24}/g;
    if (!hexadecimal.test(id)) {
      return res
        .status(400)
        .json({ error: this.errors.requiredId });
    }

    const deletedCar = await this.service.delete(id);

    if (!deletedCar) {
      return res.status(404).json({ error: this.errors.notFound });
    }

    return res.status(204).json(deletedCar);
  };
}
