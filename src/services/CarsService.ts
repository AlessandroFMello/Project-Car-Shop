import Service, { ServiceError } from '.';
import { Car, carSchema } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

class CarsService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(parsed.data);
  };
}

export default CarsService;