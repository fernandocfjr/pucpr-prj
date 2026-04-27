export type UserData = {
  firstName: string;
  surname: string;
  birthdate: Date;
  email: string;
};

export type SignUpUserData = {
  firstName: string;
  surname: string;
  birthdate: Date;
  email: string;
  password: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};
