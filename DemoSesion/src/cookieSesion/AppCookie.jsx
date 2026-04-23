import { UseAuthCookie } from "./UseAuthCookie";

export default function AppCookie() {
  const { token, login, logout } = UseAuthCookie();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Prueba de Cookies</h2>
      {
        token ? (
          <div>
            <p style={{ color: 'green' }}>✅ Sesión iniciada: <strong>{token}</strong></p>
            <button onClick={logout}>Cerrar Sesión</button>
          </div>
        ) : (
          <div>
            <p style={{ color: 'red' }}>❌ No hay sesión activa</p>
            <button onClick={login}>Iniciar Sesión (Login)</button>
          </div>
        )
      }
    </div>
  );
}