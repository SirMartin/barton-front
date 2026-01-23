import logo from '../assets/visludica.jpg';
import '../app.css';
import {useEffect, useState} from "react";

function Army() {
    const [user, setUser] = useState<{id: string, name: string} | undefined>(undefined)

    if (!user){
        console.error("Not logged in");
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/auth/user`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setUser(data.user));
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

export default Army;
