import type { LoginErrors, SignUpErrors } from "../../@types/generics";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

export function validateLoginData(
  email: string,
  password: string,
): LoginErrors {
  const errors: LoginErrors = {};

  if (!email.trim()) {
    errors.email = "Informe o e-mail.";
  } else if (!emailRegex.test(email.trim())) {
    errors.email = "Informe um e-mail valido.";
  }

  if (!password) {
    errors.password = "Informe a senha.";
  } else if (password.length < 6) {
    errors.password = "A senha deve ter ao menos 6 caracteres.";
  }

  return errors;
}

export function validateSignUpData(data: {
  firstName: string;
  surname: string;
  birthdate: string;
  email: string;
  password: string;
}): SignUpErrors {
  const errors: SignUpErrors = {};
  const firstName = data.firstName.trim();
  const surname = data.surname.trim();
  const email = data.email.trim();

  if (!firstName) {
    errors.firstName = "Informe o primeiro nome.";
  } else if (!nameRegex.test(firstName)) {
    errors.firstName = "Use apenas letras no primeiro nome.";
  }

  if (!surname) {
    errors.surname = "Informe o sobrenome.";
  } else if (!nameRegex.test(surname)) {
    errors.surname = "Use apenas letras no sobrenome.";
  }

  if (!data.birthdate) {
    errors.birthdate = "Informe a data de nascimento.";
  } else if (new Date(data.birthdate) > new Date()) {
    errors.birthdate = "A data de nascimento nao pode ser futura.";
  }

  if (!email) {
    errors.email = "Informe o e-mail.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Informe um e-mail valido.";
  }

  if (!data.password) {
    errors.password = "Informe a senha.";
  } else if (data.password.length < 6) {
    errors.password = "A senha deve ter ao menos 6 caracteres.";
  }

  return errors;
}
