import { Order } from '../../../domain/entities/Order'
import { OrderRepository } from '../../../domain/repositories/OrderRepository'

export class OrderRepositoryMemory implements OrderRepository {
    orders: Order[] = []

    async save(order: Order): Promise<void> {
        this.orders.push(order)
    }

    async findAll(): Promise<Order[]> {
        return this.orders
    }

    async clean(): Promise<void> {
        this.orders = []
    }
}
