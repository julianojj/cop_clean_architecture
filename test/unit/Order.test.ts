import { randomUUID } from 'crypto'
import { Item } from '../../src/domain/entities/Item'
import { Order } from '../../src/domain/entities/Order'

test('Não deve criar um pedido se a quantidade for menor ou igual a zero', () => {
    const order = new Order()
    expect(() => order.addItem(new Item(randomUUID(), 'item1', 300), -1))
    .toThrowError('invalid quantity')
})

test('Deve criar um pedido com 2 items e calcular o total', () => {
    const order = new Order()
    order.addItem(new Item(randomUUID(), 'item1', 300), 1)
    order.addItem(new Item(randomUUID(), 'item2', 100), 2)
    expect(order.calculateTotal()).toBe(500)
})
