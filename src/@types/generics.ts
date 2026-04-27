export type UserData = {
  uid: string;
  firstName: string;
  surname: string;
  birthdate: string;
  email: string;
  createdAt?: Date;
};

export type SignUpUserData = {
  firstName: string;
  surname: string;
  birthdate: string;
  email: string;
  password: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type LoginErrors = {
  email?: string;
  password?: string;
};

export type SignUpErrors = {
  firstName?: string;
  surname?: string;
  birthdate?: string;
  email?: string;
  password?: string;
};
