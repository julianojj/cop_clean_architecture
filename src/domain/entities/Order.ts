import { randomUUID } from 'crypto'
import { Item } from './Item'
import { OrderItem } from './OrderItems'

export class Order {
    orderItems: OrderItem[] = []

    constructor(
        readonly id?: string,
        readonly customerId?: string,
    ) { }


    addItem(item: Item, quantity: number) {
        this.orderItems.push(new OrderItem(item.id, item.price, quantity))
    }

    calculateTotal() {
        let total = 0
        for (const item of this.orderItems) {
            total += item.calculateTotal()
        }
        return total
    }
}
