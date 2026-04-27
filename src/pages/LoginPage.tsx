import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../hooks/useAuth";
import { LoadingButton } from "../components/LoadingButton";
import type { LoginErrors } from "../@types/generics";
import { validateLoginData } from "../utils/dto/user";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LoginErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLoginData(email, password);

    setFieldErrors(nextErrors);
    setErrorMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      await login({ email, password });
      navigate("/home");
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        (error.code === "auth/invalid-credential" ||
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password")
      ) {
        setErrorMessage("Conta não registrada ou dados incorretos.");
        return;
      }

      setErrorMessage("Ocorreu um erro ao realizar o login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              disabled={isLoading}
              aria-invalid={Boolean(fieldErrors.password)}
              required
            />
            {fieldErrors.password && (
              <small className="field-error">{fieldErrors.password}</small>
            )}
          </label>

          <LoadingButton type="submit" isLoading={isLoading} loadingText="Entrando...">
            Login
          </LoadingButton>
        </form>

        {errorMessage && (
          <p className="auth-message auth-message--error">{errorMessage}</p>
        )}

        <p className="auth-switch">
          Não possui uma conta? <Link to="/signup">Cadastre-se</Link>
        </p>
      </div>
    </section>
  );
}
