export type Token = string;

export type UserData = {
  name: string;
  email: string;
  token: Token;
};

export type NewUser = {
  name: string;
  email: string;
  password: string;
};

export type AuthData = {
  email: string;
  password: string;
};

