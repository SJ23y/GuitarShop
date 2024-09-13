export type Token = string;

export type UserData = {
  name: string;
  email: string;
  token: Token;
};

export type AuthData = {
  email: string;
  password: string;
};

export type DetailMessageType = {
  type: string;
  message: string;
};
