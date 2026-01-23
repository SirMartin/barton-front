import logo from '../assets/visludica.jpg';
import '../app.css';

export function Welcome() {
  const apiUrl = import.meta.env.VITE_API_URL + "/auth/twitch";

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Bienvenido al campamento Bartón.
            <br/>
            ¿Cómo apoyas a Visludica y Visbelica?
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a
                className="App-link"
                href="/army"
                rel="noopener noreferrer"
            >
              Soy de la Army
            </a>
            <a
                className="App-link"
                href={apiUrl}
                rel="noopener noreferrer"
            >
              Soy de Twitch
            </a>
          </div>
        </header>
      </div>
  );
}
