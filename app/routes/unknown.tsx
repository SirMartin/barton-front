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
                    Lo siento <b>{user ? user.name : "Unknown"}</b>, no estás en la lista. Si crees que se trata de un error contacta con Arribas.
                </p>
            </header>
        </div>
    );
}

export default Army;
