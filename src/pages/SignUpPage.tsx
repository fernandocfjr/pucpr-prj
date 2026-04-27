import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../hooks/useAuth";
import { LoadingButton } from "../components/LoadingButton";

export function SignUpPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
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
              onChange={(event) => setFirstName(event.target.value)}
              autoComplete="given-name"
              disabled={isLoading}
              required
            />
          </label>

          <label className="field">
            <span>Sobrenome</span>
            <input
              type="text"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              autoComplete="family-name"
              disabled={isLoading}
              required
            />
          </label>

          <label className="field">
            <span>Data de nascimento</span>
            <input
              type="date"
              value={birthdate}
              onChange={(event) => setBirthdate(event.target.value)}
              disabled={isLoading}
              required
            />
          </label>

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
              autoComplete="new-password"
              minLength={6}
              disabled={isLoading}
              required
            />
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
