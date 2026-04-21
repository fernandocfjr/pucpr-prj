import { useState, type SubmitEvent } from 'react'
import './styles/App.css'
import { EventLoginType } from './@types/enums';

type EventLoginTypeValue = (typeof EventLoginType)[keyof typeof EventLoginType];

const loginUserData = {
  email: "fernandocrepaldi.j@pucpr.edu.br",
  militaryGradePassword: "batatinha123"
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<EventLoginTypeValue | undefined>();

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const ok =
      email.trim() === loginUserData.email &&
      password === loginUserData.militaryGradePassword;

    setFeedback(ok ? EventLoginType.SUCCESS : EventLoginType.FAIL);
  }

  return (
    <section id="login">
      <div className="login-wrap">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
          
          <label className="field">
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          
          <button type="submit">Acessar</button>
          
          {feedback === EventLoginType.SUCCESS && (
            <p className="login-message login-message--success" role="status">
              Acessado com sucesso!
            </p>
          )}
          
          {feedback === EventLoginType.FAIL && (
            <p className="login-message login-message--fail" role="alert">
              Usuário ou senha incorretos!
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default App
