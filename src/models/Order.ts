import { Car } from 'src/models/car';
export class Order {
  orderId: number;
  carId: number;
  userId: number;
  isReturned: string;
  totalPrice: number;
  reservedFrom: Date;
  reservedTo: Date;
  carOrdered: Car;
}
