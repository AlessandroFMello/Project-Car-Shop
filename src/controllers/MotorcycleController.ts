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
    try {
      const newMotorcycle = await this.service.create(body);

      if (!newMotorcycle) {
        return res.status(400).json({ error: this.errors.badRequest });
      }
      if ('error' in newMotorcycle) {
        return res.status(400).json(newMotorcycle);
      }
      return res.status(201).json(newMotorcycle);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const motorcycles = await this.service.read();
      
      return res.json(motorcycles);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const hexadecimal = /[0-9A-Fa-f]{24}/g;
    if (!hexadecimal.test(id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    try {
      const motorcycle = await this.service.readOne(id);

      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.json(motorcycle);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }, Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const hexadecimal = /[0-9A-Fa-f]{24}/g;
    if (!hexadecimal.test(req.params.id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: this.errors.badRequest });
    }

    try {
      const updatedMoto = await this.service.update(req.params.id, req.body);

      return !updatedMoto
        ? res.status(404).json({ error: this.errors.notFound }) 
        : res.json(updatedMoto);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    const hexadecimal = /[0-9A-Fa-f]{24}/g;
    if (!hexadecimal.test(id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    try {
      const deletedMotorcycle = await this.service.delete(id);

      if (!deletedMotorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(204).json(deletedMotorcycle);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
