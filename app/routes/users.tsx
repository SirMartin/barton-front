import { useEffect, useState } from "react";
import type { Route } from "../../.react-router/types/app/routes/+types/home";
import '../app.css';

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Usuarios - Campamento Barton 2026" },
        { name: "description", content: "Lista de usuarios registrados" },
    ];
}

interface TicketUser {
    username: string;
    email: string | null;
    tickets: number | null;
}

function Users() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState<TicketUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            fetchUsers();
        } else {
            setError("Contraseña incorrecta");
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets/users`, {
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
            } else {
                setError("Error al cargar los usuarios");
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!authenticated) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Acceso Restringido</h1>
                    <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginRight: '10px',
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: 'none',
                                backgroundColor: '#9147ff',
                                color: 'white',
                                cursor: 'pointer',
                            }}
                        >
                            Entrar
                        </button>
                    </form>
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                </header>
            </div>
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Lista de Usuarios</h1>
                {loading && <p>Cargando...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && (
                    <div style={{ width: '100%', maxWidth: '800px', marginTop: '20px' }}>
                        <table
                            style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ padding: '12px', borderBottom: '2px solid #9147ff', textAlign: 'left' }}>
                                        Usuario
                                    </th>
                                    <th style={{ padding: '12px', borderBottom: '2px solid #9147ff', textAlign: 'left' }}>
                                        Email
                                    </th>
                                    <th style={{ padding: '12px', borderBottom: '2px solid #9147ff', textAlign: 'center' }}>
                                        Tickets
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                        <td style={{ padding: '12px' }}>{user.username}</td>
                                        <td style={{ padding: '12px' }}>{user.email || '-'}</td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>{user.tickets || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && <p style={{ marginTop: '20px' }}>No hay usuarios registrados</p>}
                        <button
                            onClick={fetchUsers}
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: 'none',
                                backgroundColor: '#9147ff',
                                color: 'white',
                                cursor: 'pointer',
                            }}
                        >
                            Actualizar
                        </button>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Users;
