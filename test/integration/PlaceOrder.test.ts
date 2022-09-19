import 'dotenv/config'
import { PlaceOrder } from '../../src/application/usecases/PlaceOrder'
import { CustomerRepository } from '../../src/domain/repositories/CustomerRepository'
import { ItemRepository } from '../../src/domain/repositories/ItemRepository'
import { OrderRepository } from '../../src/domain/repositories/OrderRepository'
import { pool } from '../../src/infra/database/connection'
import { CustomerRepositoryMemory } from '../../src/infra/repositories/memory/CustomerRepositoryMemory'
import { ItemRepositoryMemory } from '../../src/infra/repositories/memory/ItemRepositoryMemory'
import { OrderRepositoryMemory } from '../../src/infra/repositories/memory/OrderRepositoryMemory'

let customerRepository: CustomerRepository
let itemRepository: ItemRepository
let orderRepository: OrderRepository

beforeEach(async () => {
    customerRepository = new CustomerRepositoryMemory()
    itemRepository = new ItemRepositoryMemory()
    orderRepository = new OrderRepositoryMemory()
    await orderRepository.cleanOrders()
})

test('Não deve fazer um pedido se o cliente não existir', async () => {
    const placeOrder = new PlaceOrder(
        customerRepository,
        itemRepository,
        orderRepository
    )
    const input = {
        customerId: '1234',
        items: [
            {
                id: 'ccf0338f-9e44-4795-89f0-685da50ca17a',
                quantity: 2,
            },
            {
                id: 'f8193f5a-99c6-4001-8c77-0ddcdd881c65',
                quantity: 1,
            }
        ]
    }
    await expect(placeOrder.execute(input)).rejects.toThrowError('customer not found')
})

test('Não deve fazer um pedido se o item não existir', async () => {
    const placeOrder = new PlaceOrder(
        customerRepository,
        itemRepository,
        orderRepository
    )
    const input = {
        customerId: '06307706-45ce-468e-807d-36d4e7ae8d98',
        items: [
            {
                id: '1234',
                quantity: 2,
            },
            {
                id: 'f8193f5a-99c6-4001-8c77-0ddcdd881c65',
                quantity: 1,
            }
        ]
    }
    await expect(placeOrder.execute(input)).rejects.toThrowError('item not found')
})

test('Deve fazer um pedido com 2 items', async () => {
    const placeOrder = new PlaceOrder(
        customerRepository,
        itemRepository,
        orderRepository
    )
    const input = {
        customerId: '06307706-45ce-468e-807d-36d4e7ae8d98',
        items: [
            {
                id: 'ccf0338f-9e44-4795-89f0-685da50ca17a',
                quantity: 2,
            },
            {
                id: 'f8193f5a-99c6-4001-8c77-0ddcdd881c65',
                quantity: 1,
            }
        ]
    }
    await placeOrder.execute(input)
    const orders = await orderRepository.findAllOrders()
    expect(orders).toHaveLength(1)
})

afterAll(async () => {
    await pool.end()
})
