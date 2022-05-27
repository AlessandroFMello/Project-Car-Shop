import { expect } from 'chai';
// import mongoose from 'mongoose';
import Sinon from 'sinon';
import { Car } from '../../../interfaces/CarInterface';
import CarModel from '../../../models/CarModel';
import CarsService from '../../../services/CarsService';

const allCarsMock = [
	{
		"_id": "628f7b9ee2be6772f5e86099",
		"model": "Marea Turno",
		"year": 1995,
		"color": "Black",
		"buyValue": 17000,
		"seatsQty": 4,
		"doorsQty": 4
	},
	{
		"_id": "628f7ba0e2be6772f5e8609b",
		"model": "Marea Turno",
		"year": 1995,
		"color": "Black",
		"buyValue": 17000,
		"seatsQty": 4,
		"doorsQty": 4
	},
	{
		"_id": "628f7ba1e2be6772f5e8609d",
		"model": "Marea Turno",
		"year": 1995,
		"color": "Black",
		"buyValue": 17000,
		"seatsQty": 4,
		"doorsQty": 4
	},
	{
		"_id": "628f7ba1e2be6772f5e8609f",
		"model": "Marea Turno",
		"year": 1995,
		"color": "Black",
		"buyValue": 17000,
		"seatsQty": 4,
		"doorsQty": 4
	}
]

const newCarMock = {
  "model": "Marea Turno",
  "year": 1995,
  "color": "Black",
  "buyValue": 17000,
  "seatsQty": 4,
  "doorsQty": 4
}

const oneCarMock = {
  "_id": "628fafea3b94a2894ec3f9e7",
  "model": "Marea Turno",
  "year": 1995,
  "color": "Black",
  "buyValue": 17000,
  "seatsQty": 4,
  "doorsQty": 4
}

describe('Testa CarModel', () => {
  let carModel = new CarModel();
  let carService = new CarsService(carModel);

  describe('create()', () => {
    before(() => {
      Sinon
      .stub(carModel, 'create')
      .resolves({
        ...newCarMock,
      } as Car);
    });

    after(() => {
      (carModel.create as Sinon.SinonStub).restore();
    });
    
    it('Testa se é retornado um objeto', async () => {
      const carCreated = await carService.create(newCarMock);

      expect(carCreated).to.be.an('object');
    })

    it('Testa se se o objeto contém todas as propriedades', async () => {
      const carCreated = await carService.create(newCarMock);

      expect(carCreated).to.have.property('model');
      expect(carCreated).to.have.property('year');
      expect(carCreated).to.have.property('color');
      expect(carCreated).to.have.property('buyValue');
      expect(carCreated).to.have.property('seatsQty');
      expect(carCreated).to.have.property('doorsQty');
    })
  });

  describe('read()', () => {
    before(() => {
      Sinon
      .stub(carModel, 'read')
      .resolves({
        ...allCarsMock,
      } as Car[]);
    });

    after(() => {
      (carModel.read as Sinon.SinonStub).restore();
    });

    it('Testa se é retornado um array', async () => {
      const allCars = await carService.read();

      const allCarsArray = Object.values(allCars);

      expect(allCarsArray).to.be.an('array');
    })

    it('Testa se todos itens do array são objetos', async () => {
      const allCars = await carService.read();
      const allCarsArray = Object.values(allCars);

      allCarsArray.forEach((car) => {

        expect(car).to.be.an('object');
      });
    })

    it('Testa se todos itens do array contém todas as propriedades', async () => {
      const allCars = await carService.read();
      const allCarsArray = Object.values(allCars);
      

      allCarsArray.forEach((car) => {

        expect(car).to.have.property('_id');
        expect(car).to.have.property('model');
        expect(car).to.have.property('year');
        expect(car).to.have.property('color');
        expect(car).to.have.property('buyValue');
        expect(car).to.have.property('seatsQty');
        expect(car).to.have.property('doorsQty');
      });
    });
  });

  describe('readOne()', () => {
    before(() => {
      Sinon
      .stub(carModel, 'readOne')
      .resolves({
        ...oneCarMock,
      } as Car);
    });

    after(() => {
      (carModel.readOne as Sinon.SinonStub).restore();
    });

    const mockId = '628fafea3b94a2894ec3f9e7';
    it('Testa se é retornado um objeto', async () => {
      const carRead = await carService.readOne(mockId);

      expect(carRead).to.be.an('object');
    })

    it('Testa se o objeto contém todas as propriedades', async () => {
      const carRead = await carService.readOne(mockId);

      expect(carRead).to.have.property('_id');
      expect(carRead).to.have.property('model');
      expect(carRead).to.have.property('year');
      expect(carRead).to.have.property('color');
      expect(carRead).to.have.property('buyValue');
      expect(carRead).to.have.property('seatsQty');
      expect(carRead).to.have.property('doorsQty');
    })
  });

  describe('update()', () => {
    before(() => {
      Sinon
      .stub(carModel, 'update')
      .resolves({
        ...oneCarMock,
      } as Car);
    });

    after(() => {
      (carModel.update as Sinon.SinonStub).restore();
    });

    const mockId = '628fafea3b94a2894ec3f9e7';
    it('Testa se é retornado um objeto', async () => {
      const carRead = await carService.update(mockId, oneCarMock);

      expect(carRead).to.be.an('object');
    })

    it('Testa se o objeto contém todas as propriedades', async () => {
      const carRead = await carService.update(mockId, oneCarMock);

      expect(carRead).to.have.property('_id');
      expect(carRead).to.have.property('model');
      expect(carRead).to.have.property('year');
      expect(carRead).to.have.property('color');
      expect(carRead).to.have.property('buyValue');
      expect(carRead).to.have.property('seatsQty');
      expect(carRead).to.have.property('doorsQty');
    })
  });

  describe('delete()', () => {
    before(() => {
      Sinon
      .stub(carModel, 'delete')
      .resolves({
        ...oneCarMock,
      } as Car);
    });

    after(() => {
      (carModel.delete as Sinon.SinonStub).restore();
    });

    const mockId = '628fafea3b94a2894ec3f9e7';
    it('Testa se é retornado um objeto', async () => {
      const deletedCar = await carService.delete(mockId);

      expect(deletedCar).to.exist;
    })
  });
});