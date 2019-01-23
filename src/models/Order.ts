import { Car } from 'src/models/car';
export class Order {
  orderId: number;
  carId: number;
  userId: number;
  isReturned: string;
  totalPrice: number;
  reservedFrom: string;
  reservedTo: string;
  carOrdered: Car;
}
