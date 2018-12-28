import { CarForUser } from 'src/models/carForUser';
export class OrderDetails {
  orderId: number;
  carId: number;
  userId: number;
  isReturned: string;
  totalPrice: number;
  reservedFrom: Date;
  reservedTo: Date;
  carOrdered: CarForUser;
}
