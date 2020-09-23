import { BACKEND_SERVER } from "../constants/external";

export default class Database {
  static async getSystems(token) {
    const request = await fetch(`${BACKEND_SERVER}/system`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await request.json();
  }

  static async getCustomers(token) {
    const request = await fetch(`${BACKEND_SERVER}/customer`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await request.json();
  }

  static async createCustomer(token, customer) {
    const request = await fetch(`${BACKEND_SERVER}/customer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    return await request.json();
  }

  static async deleteCustomer(token, customer) {
    const request = await fetch(`${BACKEND_SERVER}/customer/${customer.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await request.json();
  }

  static async editCustomer(token, customer) {
    const request = await fetch(`${BACKEND_SERVER}/customer/${customer.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    return await request.json();
  }
}
