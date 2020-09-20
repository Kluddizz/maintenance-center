import { BACKEND_SERVER } from "../constants/external.js";

export default class Auth {
  static async login(username, password) {
    const request = await fetch(`${BACKEND_SERVER}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    return await request.json();
  }

  static async getUser(token) {
    const request = await fetch(`${BACKEND_SERVER}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return await request.json();
  }
}
