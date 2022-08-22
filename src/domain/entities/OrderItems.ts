export class OrderItem {
    constructor(
        readonly itemId: string,
        readonly price: number,
        readonly quantity: number,
    ) {
        if (quantity <= 0) throw new Error('invalid quantity')
    }

    calculateTotal(): number {
        return this.price * this.quantity
    }
}
