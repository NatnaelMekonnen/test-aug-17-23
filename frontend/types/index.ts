export interface CreateUser {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface User extends CreateUser {
  id: number;
}
