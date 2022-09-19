import { Customer } from '../../../domain/entities/Customer'
import { CustomerRepository } from '../../../domain/repositories/CustomerRepository'

export class CustomerRepositoryMemory implements CustomerRepository {
    customers: Customer[]

    constructor() { 
        this.customers = [
            new Customer('06307706-45ce-468e-807d-36d4e7ae8d98', 'Juliano', 'juliano@test.com')
        ]
    }

    async findCustomer(customerId: string): Promise<Customer> {
        return this.customers.find(customer => customer.id === customerId)
    }
}
