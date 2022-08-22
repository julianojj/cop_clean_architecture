import { randomUUID } from 'crypto'
import { Order } from '../../domain/entities/Order'
import { CustomerRepository } from '../../domain/repositories/CustomerRepository'
import { ItemRepository } from '../../domain/repositories/ItemRepository'
import { OrderRepository } from '../../domain/repositories/OrderRepository'
import { CustomError } from '../exceptions/Error'

type PlaceOrderInput = {
    customerId: string
    items: {
        id: string,
        quantity: number,
    }[]
}

export class PlaceOrder {
    constructor(
        readonly customerRepository: CustomerRepository,
        readonly itemRepository: ItemRepository,
        readonly orderRepository: OrderRepository
    ) { }

    async execute (input: PlaceOrderInput) {
        const customer = await this.customerRepository.find(input.customerId)
        if (!customer) throw new CustomError('customer not found', 404)
        const order = new Order(randomUUID(), customer.id)
        for (const item of input.items) {
            const data = await this.itemRepository.find(item.id)
            if (!data) throw new CustomError('item not found', 404)
            order.addItem(data, item.quantity)
        }
        await this.orderRepository.save(order)
    }
}
