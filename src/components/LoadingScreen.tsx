type LoadingScreenProps = {
  label?: string;
};

export function LoadingScreen({ label = "Carregando..." }: LoadingScreenProps) {
  return (
    <section className="loading-screen" aria-live="polite" aria-busy="true">
      <div className="loading-card">
        <span className="loading-spinner" />
        <p>{label}</p>
      </div>
    </section>
  );
}
