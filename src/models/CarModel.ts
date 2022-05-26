import { Schema, model as createModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

// interface CarDocument extends Car, Document { }

const carSchema = new Schema<Car>(
  {
    _id: Schema.Types.ObjectId,
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
    seatsQty: Number,
    doorsQty: Number,
  },
  {
    versionKey: false,
  },
);

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;