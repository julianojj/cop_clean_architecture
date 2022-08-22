import { Item } from '../entities/Item'

export interface ItemRepository {
	find(itemId: string): Promise<Item>
}
