import { Item } from '../../../domain/entities/Item'
import { Order } from '../../../domain/entities/Order'
import { OrderRepository } from '../../../domain/repositories/OrderRepository'
import { pool } from '../../database/connection'

export class OrderRepositoryDatabase implements OrderRepository {
    async saveOrder(order: Order): Promise<void> {
        const connection = await pool.getConnection()
        await connection.query(`INSERT INTO Orders(Id, CustomerId, Total)
        VALUES(?, ?, ?)`, [order.id, order.customerId, order.calculateTotal()])
        await connection.release()
        for (const orderItem of order.orderItems) {
            const connection = await pool.getConnection()
            await connection.query(`INSERT INTO OrderItems(OrderId, ItemId, Quantity)
            VALUES(?, ?, ?)`, [order.id, orderItem.itemId, orderItem.quantity])
            await connection.release()
        }
    }

    async findAllOrders(): Promise<Order[]> {
        const connection = await pool.getConnection()
        const ordersData = await connection.query('SELECT * FROM Orders')
        const orders: Order[] = []
        for (const orderData of ordersData) {
            const order = new Order(orderData.Id, orderData.CustomerId)
            const itemsData = await connection.query(`SELECT I.Id,
            I.Name,
            I.Price,
            OI.Quantity
            FROM OrderItems OI
            INNER JOIN Items I ON I.Id = OI.ItemId
            INNER JOIN Orders O ON O.Id = OI.OrderId
            WHERE O.Id = ?`, 
            [order.id])
            for (const itemData of itemsData) {
                order.addItem(new Item(itemData.Id, itemData.Name, itemData.Price), itemData.Quantity)
            }
            orders.push(order)
        }
        await connection.release()
        return orders
    }

    async cleanOrders(): Promise<void> {
        const connection = await pool.getConnection()
        await connection.query('DELETE FROM OrderItems')
        await connection.query('DELETE FROM Orders')
        await connection.release()
    }
}

