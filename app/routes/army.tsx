import logo from '../assets/visludica.jpg';
import '../app.css';
import type {Route} from "../../.react-router/types/app/routes/+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Campamento Barton 2026" },
        { name: "description", content: "¿Has sido bueno? ¡Consigue tus entradas para el Campamento Barton 2026!" },
    ];
}

function Army() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Aquí una landing page con para meter el email e instrucciones.
        </p>
      </header>
    </div>
  );
}

export default Army;
