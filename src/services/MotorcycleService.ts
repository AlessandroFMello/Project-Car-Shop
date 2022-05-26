import Service, { ServiceError } from '.';
import {
  Motorcycle, motorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/MotorcycleModel';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (
    obj: Motorcycle,
  ): Promise<Motorcycle | ServiceError | null> => {
    const parsed = motorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(parsed.data);
  };
}

export default MotorcycleService;