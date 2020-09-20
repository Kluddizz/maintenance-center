import { BACKEND_SERVER } from '../constants/external';

export default class Database {

  static async getCustomers(token) {
    const request = await fetch(`${BACKEND_SERVER}/customer`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return await request.json();
  }

  static async createCustomer(token, customer) {
    const request = await fetch(`${BACKEND_SERVER}/customer`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    });

    return await request.json();
  }

}
