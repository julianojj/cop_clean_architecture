import { Customer } from '../entities/Customer'

export interface CustomerRepository {
	find(customerId: string): Promise<Customer>
}
