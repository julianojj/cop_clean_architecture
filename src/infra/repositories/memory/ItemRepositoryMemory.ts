import { Item } from '../../../domain/entities/Item'
import { ItemRepository } from '../../../domain/repositories/ItemRepository'

export class ItemRepositoryMemory implements ItemRepository {
    items: Item[]

    constructor() {
        this.items = [
            new Item('ccf0338f-9e44-4795-89f0-685da50ca17a', 'Teclado Mecânico Gamer HyperX Mars RGB', 330),
            new Item('f8193f5a-99c6-4001-8c77-0ddcdd881c65', 'Notebook asus vivobook', 3700),
        ]
    }

    async find(itemId: string): Promise<Item> {
        return this.items.find(item => item.id === itemId)
    }
}
