import { z } from 'zod';
import { Vehicle, vehicleSchema } from './VehicleInterface';

export const carSchema = vehicleSchema.extend({
  doorsQty: z.number({
    required_error: 'Door quantity is required',
    invalid_type_error: 'Door quantity must be a number',
  })
    .min(2, { message: 'Door quantity must be equal or greater than 2' })
    .max(4, { message: 'Door quantity must be equal or less than 4' }),
  seatsQty: z.number({
    required_error: 'Seats quantity is required',
    invalid_type_error: 'Seats quantity must be a number',
  })
    .min(2, { message: 'Seats quantity must be equal or greater than 2' })
    .max(7, { message: 'Seats quantity must be equal or less than 7' }),
  _id: z.optional(
    z.string({ invalid_type_error: 'Id must be a string' })
      .regex(
        /^[0-9a-fA-F]{24}$/,
        { message: 'Id must have 24 hexadecimal characters' },
      ),
  ),
});

export type Car = Vehicle & z.infer<typeof carSchema>;
