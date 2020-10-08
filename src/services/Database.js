import { BACKEND_SERVER } from "../constants/external";

export default class Database {
  static async getUsers(token) {
    const request = await fetch(`${BACKEND_SERVER}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await request.json();
  }

  static async createMaintenance(token, maintenance) {
    const request = await fetch(`${BACKEND_SERVER}/maintenance`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(maintenance),
    });

    return await request.json();
  }

  static async getMaintenances(token) {
    const request = await fetch(`${BACKEND_SERVER}/maintenance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await request.json();
  }

  static async deleteSystem(token, system) {
    const request = await fetch(`${BACKEND_SERVER}/system/${system.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await request.json();
  }

  static async editSystem(token, system) {
    const request = await fetch(`${BACKEND_SERVER}/system/${system.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(system),
    });

    return await request.json();
  }

  static async createSystem(token, system) {
    const request = await fetch(`${BACKEND_SERVER}/system`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(system),
    });

    return await request.json();
  }

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
