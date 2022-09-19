import { Item } from '../entities/Item'

export interface ItemRepository {
	findItem(itemId: string): Promise<Item>
}
