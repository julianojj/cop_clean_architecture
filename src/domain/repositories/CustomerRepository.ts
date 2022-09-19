import { Customer } from '../entities/Customer'

export interface CustomerRepository {
	findCustomer(customerId: string): Promise<Customer>
}
