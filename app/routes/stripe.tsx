import logo from '../assets/visludica.jpg';
import '../app.css';
import {useEffect, useState} from "react";
import type {Route} from "../../.react-router/types/app/routes/+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Campamento Barton 2026" },
        { name: "description", content: "¿Has sido bueno? ¡Consigue tus entradas para el Campamento Barton 2026!" },
    ];
}

function Stripe() {
    const [user, setUser] = useState<{id: string, name: string} | undefined>(undefined)

    if (!user){
        console.error("Not logged in");
    }

    useEffect(() => {
        // Check if there's an auth token in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const authToken = urlParams.get('auth_token');

        if (authToken) {
            // Exchange token for session
            fetch(`${import.meta.env.VITE_API_URL}/auth/exchange-token`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: authToken })
            })
            .then(res => res.json())
            .then(data => {
                // Remove token from URL
                window.history.replaceState({}, document.title, window.location.pathname);
                setUser(data.user);
            })
            .catch(err => {
                console.error('Token exchange failed:', err);
                // Fall back to checking session
                checkSession();
            });
        } else {
            // No token, check existing session
            checkSession();
        }

        function checkSession() {
            fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
                credentials: 'include',
                cache: 'no-store'
            })
                .then(res => res.json())
                .then(data => setUser(data.user));
        }
    }, []);

  return (
      <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                  Hola <b>{user ? user.name : "Unknown"}</b> gracias por apoyar a Visludica y Visbelica.

                  Te llevamos a comprar tú entrada.
              </p>
          </header>
      </div>
  );
}

export default Stripe;
