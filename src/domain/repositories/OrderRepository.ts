import { Order } from '../entities/Order'

export interface OrderRepository {
    saveOrder(order: Order): Promise<void>
    findAllOrders(): Promise<Order[]>
    cleanOrders(): Promise<void>
}
