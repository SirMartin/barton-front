import logo from '../assets/forbidden.jpg';
import '../app.css';
import {useEffect, useState} from "react";
import type {Route} from "../../.react-router/types/app/routes/+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Campamento Barton 2026"},
        {name: "description", content: "¿Has sido bueno? ¡Consigue tus entradas para el Campamento Barton 2026!"},
    ];
}

function Unknown() {
    const [user, setUser] = useState<{ id: string, name: string } | undefined>(undefined)

    if (!user) {
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
            fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {credentials: 'include', cache: 'no-store'})
                .then(res => res.json())
                .then(data => setUser(data.user));
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-2">
            <div className="barton-overlay max-w-3xl w-full mx-4 p-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-3xl md:text-4xl text-barton-primary mb-4 font-bold">
                        Campamento Barton 2026
                    </h1>
                    <img
                        src={logo}
                        className="w-full max-w-md h-auto rounded-barton shadow-barton-strong mb-4"
                        alt="Forbidden"
                    />
                    <p className="text-xl md:text-2xl text-barton-dark">
                        Lo siento <b className="text-barton-primary">{user ? user.name : "Unknown"}</b>, no estás en la lista.
                    </p>
                    <p className="text-lg md:text-xl text-barton-dark mt-3">
                        Si crees que se trata de un error contacta con{' '}
                        <a href="mailto:contacto@campamentobarton.com" className="text-barton-primary hover:text-barton-secondary font-semibold">
                            contacto@campamentobarton.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Unknown;
