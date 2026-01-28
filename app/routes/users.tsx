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

type SortField = 'username' | 'email' | 'tickets';
type SortDirection = 'asc' | 'desc';

function Users() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState<TicketUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<SortField>('tickets');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

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

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredAndSortedUsers = users
        .filter(user => {
            const search = searchTerm.toLowerCase();
            return (
                user.username.toLowerCase().includes(search) ||
                (user.email && user.email.toLowerCase().includes(search))
            );
        })
        .sort((a, b) => {
            let aValue: string | number = '';
            let bValue: string | number = '';

            if (sortField === 'username') {
                aValue = a.username.toLowerCase();
                bValue = b.username.toLowerCase();
            } else if (sortField === 'email') {
                aValue = (a.email || '').toLowerCase();
                bValue = (b.email || '').toLowerCase();
            } else if (sortField === 'tickets') {
                aValue = a.tickets || 0;
                bValue = b.tickets || 0;
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    if (!authenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center py-4">
                <div className="barton-overlay max-w-md w-full mx-4 p-8">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl md:text-3xl text-barton-primary mb-6 font-bold">
                            Acceso Restringido
                        </h1>
                        <form onSubmit={handleLogin} className="w-full">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="w-full px-4 py-3 mb-4 text-base rounded-barton border border-barton-primary focus:outline-none focus:ring-2 focus:ring-barton-primary"
                            />
                            <button type="submit" className="barton-btn w-full">
                                Entrar
                            </button>
                        </form>
                        {error && (
                            <p className="text-red-600 mt-4 text-sm font-semibold">{error}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="barton-overlay w-full max-w-5xl p-6">
                <h1 className="text-2xl md:text-3xl text-barton-primary mb-6 font-bold text-center">
                    Lista de Usuarios
                </h1>

                {loading && (
                    <p className="text-center text-barton-dark text-base">Cargando...</p>
                )}

                {error && (
                    <p className="text-center text-red-600 font-semibold text-base">{error}</p>
                )}

                {!loading && !error && (
                    <div className="w-full">
                        <div className="mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por nombre o email..."
                                className="w-full px-4 py-3 text-sm rounded-barton border border-barton-primary focus:outline-none focus:ring-2 focus:ring-barton-primary bg-white"
                            />
                        </div>

                        <div className="overflow-x-auto rounded-barton shadow-barton">
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                    <tr className="bg-barton-primary text-white">
                                        <th
                                            className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-barton-secondary transition-colors"
                                            onClick={() => handleSort('username')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Usuario
                                                {sortField === 'username' && (
                                                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-barton-secondary transition-colors"
                                            onClick={() => handleSort('email')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Email
                                                {sortField === 'email' && (
                                                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            className="px-4 py-3 text-center text-sm font-semibold cursor-pointer hover:bg-barton-secondary transition-colors"
                                            onClick={() => handleSort('tickets')}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                Tickets
                                                {sortField === 'tickets' && (
                                                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                                )}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedUsers.map((user, index) => (
                                        <tr
                                            key={index}
                                            className={`border-b border-gray-200 text-sm ${
                                                index % 2 === 0 ? 'bg-white' : 'bg-barton-light bg-opacity-30'
                                            }`}
                                        >
                                            <td className="px-4 py-2 text-barton-dark">{user.username}</td>
                                            <td className="px-4 py-2 text-barton-dark">{user.email || '-'}</td>
                                            <td className="px-4 py-2 text-center text-barton-dark font-semibold">
                                                {user.tickets || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {users.length === 0 && (
                            <p className="text-center text-barton-dark mt-6 text-base">
                                No hay usuarios registrados
                            </p>
                        )}

                        {users.length > 0 && filteredAndSortedUsers.length === 0 && (
                            <p className="text-center text-barton-dark mt-6 text-base">
                                No se encontraron usuarios con ese criterio de búsqueda
                            </p>
                        )}

                        <div className="text-center text-barton-dark text-sm mt-4">
                            Mostrando {filteredAndSortedUsers.length} de {users.length} usuarios
                        </div>

                        <div className="flex justify-center mt-6">
                            <button onClick={fetchUsers} className="barton-btn">
                                Actualizar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;
