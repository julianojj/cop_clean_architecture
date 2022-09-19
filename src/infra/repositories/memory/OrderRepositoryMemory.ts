import { Order } from '../../../domain/entities/Order'
import { OrderRepository } from '../../../domain/repositories/OrderRepository'

export class OrderRepositoryMemory implements OrderRepository {
    orders: Order[] = []

    async saveOrder(order: Order): Promise<void> {
        this.orders.push(order)
    }

    async findAllOrders(): Promise<Order[]> {
        return this.orders
    }

    async cleanOrders(): Promise<void> {
        this.orders = []
    }
}
