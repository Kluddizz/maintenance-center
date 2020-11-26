import { BACKEND_SERVER } from "../constants/external";

export default class Database {
  static async editAppointment(token, appointment) {
    const request = await fetch(
      `${BACKEND_SERVER}/appointment/${appointment.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      }
    );

    return await request.json();
  }

  static async createAppointment(token, appointment) {
    const request = await fetch(
      `${BACKEND_SERVER}/appointment/maintenance/${appointment.maintenanceid}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      }
    );

    return await request.json();
  }

  static async getAppointments(token, maintenanceId) {
    const request = await fetch(
      `${BACKEND_SERVER}/appointment/maintenance/${maintenanceId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await request.json();
  }

  static async getStatistics(token, stateId) {
    const request = await fetch(`${BACKEND_SERVER}/stats/state/${stateId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await request.json();
  }

  static async getStatisticsForUser(token, user, stateId) {
    const request = await fetch(
      `${BACKEND_SERVER}/stats/user/${user.id}/state/${stateId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await request.json();
  }

  static async getStates(token) {
    const request = await fetch(`${BACKEND_SERVER}/state`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await request.json();
  }

  static async getState(token, id) {
    const request = await fetch(`${BACKEND_SERVER}/states/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await request.json();
  }

  static async getUsers(token) {
    const request = await fetch(`${BACKEND_SERVER}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await request.json();
  }

  static async deleteMaintenance(token, maintenance) {
    const request = await fetch(
      `${BACKEND_SERVER}/maintenance/${maintenance.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await request.json();
  }

  static async editMaintenance(token, maintenance) {
    const request = await fetch(
      `${BACKEND_SERVER}/maintenance/${maintenance.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(maintenance),
      }
    );

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

  static async getMaintenances(token, params) {
    const request = await fetch(
      `${BACKEND_SERVER}/maintenance${params ?? ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

  static async getSystemsForUser(token, user) {
    const request = await fetch(`${BACKEND_SERVER}/system/user/${user.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

  static async getCustomersForUser(token, user) {
    const request = await fetch(`${BACKEND_SERVER}/customer/user/${user.id}`, {
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
