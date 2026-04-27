import { LoadingScreen } from "../components/LoadingScreen";
import { useAuth } from "../hooks/useAuth";

export function HomePage() {
  const { userData, logout, loading } = useAuth();

  return (
    <section className="home-page">
      {loading && (
        <LoadingScreen label="Carregando..." />
      )}

      {!!userData && !loading && (
        <div className="home-card">
          <h1>Home</h1>
          <h2>Meus dados</h2>
          <p>
            <strong>Nome completo:</strong>{" "}
            {userData.firstName + " " + userData.surname}
          </p>

          <p>
            <strong>Data de nascimento:</strong> {userData.birthdate}
          </p>

          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {!userData && !loading && <h2>Falha ao carregar dados do usuário</h2>}
    </section>
  );
}
