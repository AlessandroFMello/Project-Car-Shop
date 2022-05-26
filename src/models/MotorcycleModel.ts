import { Schema, model as createModel } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

const motorcycleSchema = new Schema<Motorcycle>(
  {
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
    category: String,
    engineCapacity: String,
  },
  {
    versionKey: false,
  },
);

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motorcycles', motorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;