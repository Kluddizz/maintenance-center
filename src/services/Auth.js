import { AUTH_SERVER } from "../constants/external.js";

export default class Auth {
  static async login(username, password) {
    const request = await fetch(`${AUTH_SERVER}/login`, {
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
}
