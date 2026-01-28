import logo from '../assets/cartel-campamento-2026.jpg';
import '../app.css';

export function Welcome() {
  const apiUrl = import.meta.env.VITE_API_URL + "/auth/twitch";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <div className="barton-overlay max-w-3xl w-full mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={logo}
            className="w-full max-w-md h-auto rounded-barton shadow-barton-strong mb-2"
            alt="Cartel Campamento 2026"
          />
          <h2 className="text-2xl md:text-3xl text-barton-primary mb-1">
            Bienvenido al campamento Bartón.
          </h2>
          <h3 className="text-xl md:text-2xl text-barton-dark mb-4">
            ¿Cómo apoyas a Visludica y Visbelica?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a
              className="barton-btn hover:opacity-100"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfzv-dAcoID6i8x28hAejSXrFfQZnHBmPOSTWnIDtq6V23vew/viewform"
              rel="noopener noreferrer"
            >
              Soy de la Army
            </a>
            <a
              className="barton-btn hover:opacity-100"
              href={apiUrl}
              rel="noopener noreferrer"
            >
              Soy de Twitch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
