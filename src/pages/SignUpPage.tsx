import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../hooks/useAuth";
import { LoadingButton } from "../components/LoadingButton";
import { validateSignUpData } from "../utils/dto/user";
import type { SignUpErrors } from "../@types/generics";

export function SignUpPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<SignUpErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateSignUpData({
      firstName,
      surname,
      birthdate,
      email,
      password,
    });

    setFieldErrors(nextErrors);
    setErrorMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      await register({ firstName, surname, birthdate, email, password });

      navigate("/home");
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/email-already-in-use") {
        setErrorMessage("Este e-mail já está registrado.");
        return;
      }

      setErrorMessage("Não foi possível cadastrar a sua conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Cadastro</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Primeiro nome</span>
            <input
              type="text"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
                setFieldErrors((current) => ({ ...current, firstName: undefined }));
              }}
              autoComplete="given-name"
              disabled={isLoading}
              aria-invalid={Boolean(fieldErrors.firstName)}
              required
            />
            {fieldErrors.firstName && (
              <small className="field-error">{fieldErrors.firstName}</small>
            )}
          </label>

          <label className="field">
            <span>Sobrenome</span>
            <input
              type="text"
              value={surname}
              onChange={(event) => {
                setSurname(event.target.value);
                setFieldErrors((current) => ({ ...current, surname: undefined }));
              }}
              autoComplete="family-name"
              disabled={isLoading}
              aria-invalid={Boolean(fieldErrors.surname)}
              required
            />
            {fieldErrors.surname && <small className="field-error">{fieldErrors.surname}</small>}
          </label>

          <label className="field">
            <span>Data de nascimento</span>
            <input
              type="date"
              value={birthdate}
              onChange={(event) => {
                setBirthdate(event.target.value);
                setFieldErrors((current) => ({ ...current, birthdate: undefined }));
              }}
              disabled={isLoading}
              aria-invalid={Boolean(fieldErrors.birthdate)}
              required
            />
            {fieldErrors.birthdate && (
              <small className="field-error">{fieldErrors.birthdate}</small>
            )}
          </label>

          <label className="field">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setFieldErrors((current) => ({ ...current, email: undefined }));
              }}
              autoComplete="email"
              disabled={isLoading}
              aria-invalid={Boolean(fieldErrors.email)}
              required
            />
            {fieldErrors.email && <small className="field-error">{fieldErrors.email}</small>}
          </label>

          <label className="field">
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setFieldErrors((current) => ({ ...current, password: undefined }));
              }}
              autoComplete="new-password"
              minLength={6}
              disabled={isLoading}
              aria-invalid={Boolean(fieldErrors.password)}
              required
            />
            {fieldErrors.password && (
              <small className="field-error">{fieldErrors.password}</small>
            )}
          </label>

          <LoadingButton type="submit" isLoading={isLoading} loadingText="Cadastrando...">
            Cadastrar-se
          </LoadingButton>
        </form>

        {errorMessage && <p className="auth-message auth-message--error">{errorMessage}</p>}

        <p className="auth-switch">
          Já tem uma conta? <Link to="/login">Realizar login</Link>
        </p>
      </div>
    </section>
  );
}
