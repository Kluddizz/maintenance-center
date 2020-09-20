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

}
