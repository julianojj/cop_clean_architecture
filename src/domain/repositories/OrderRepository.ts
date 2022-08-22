import { Order } from '../entities/Order'

export interface OrderRepository {
    save(order: Order): Promise<void>
    findAll(): Promise<Order[]>
    clean(): Promise<void>
}
