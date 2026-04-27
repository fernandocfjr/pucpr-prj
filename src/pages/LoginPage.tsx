import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../hooks/useAuth";
import { LoadingButton } from "../components/LoadingButton";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
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
        setErrorMessage("Essa conta não está registrada.");
        return;
      }

      setErrorMessage("Não foi possível realizar o login. Tente novamente.");
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
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              disabled={isLoading}
              required
            />
          </label>

          <label className="field">
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
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
