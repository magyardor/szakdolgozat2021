export interface UserData {
  email: string;
  password: string;
}

export class User {
  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }
  email: string;
  token: string;
}
