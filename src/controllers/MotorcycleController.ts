import { Response, Request } from 'express';
import Controller, { RequestWithBody, ResponseError } from './Controller';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

export default class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const newMotorcycle = await this.service.create(body);

    if (!newMotorcycle) {
      return res
        .status(400)
        .json({ error: this.errors.badRequest });
    }
    if ('error' in newMotorcycle) {
      return res.status(400).json(newMotorcycle);
    }
    return res.status(201).json(newMotorcycle);
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    const motorcycles = await this.service.read();
      
    return res.json(motorcycles);
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const hexadecimal = /[0-9A-Fa-f]{24}/g;
    if (!hexadecimal.test(id)) {
      return res
        .status(400)
        .json({ error: this.errors.requiredId });
    }

    const motorcycle = await this.service.readOne(id);

    if (!motorcycle) {
      return res
        .status(404)
        .json({ error: this.errors.notFound });
    }

    return res.json(motorcycle);
  };

  update = async (
    req: Request<{ id: string }, Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    const hexadecimal = /[0-9A-Fa-f]{24}/g;

    if (!hexadecimal.test(req.params.id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: this.errors.badRequest });
    }

    const updatedMoto = await this.service.update(id, body);

    return !updatedMoto
      ? res.status(404).json({ error: this.errors.notFound }) 
      : res.json(updatedMoto);
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    const hexadecimal = /[0-9A-Fa-f]{24}/g;

    if (!hexadecimal.test(id)) {
      return res
        .status(400)
        .json({ error: this.errors.requiredId });
    }

    const deletedMotorcycle = await this.service.delete(id);

    if (!deletedMotorcycle) {
      return res
        .status(404)
        .json({ error: this.errors.notFound });
    }

    return res.status(204).json(deletedMotorcycle);
  };
}
