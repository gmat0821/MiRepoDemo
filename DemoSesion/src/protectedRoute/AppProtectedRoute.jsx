import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login";
import {useAuth} from "./useAuth";
import ProtectedRoute from "./ProtectedRoute"; 
import Dashboard from "./Dashboard";


export default function AppProtectedRoute(){
    const {user, loading, checkAuth} = useAuth();


    const logout = async() => {
        await fetch("http://localhost:5131/logout", {
            method: "POST",
            credentials: "include"
        });
        checkAuth();
    };


    return(
        <BrowserRouter>
            <Routes>
                {/* {Publica} */}
                <Route
                    path= "/login"
                    element={<Login onLogin={checkAuth}/>}
                />                    
               
                {/* {Protegidas} */}
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute user={user} loading={loading}>
                        <Dashboard user={user} onLogout={logout}/>
                    </ProtectedRoute>}
                />
                {/* Default */}
                <Route
                    path="*"
                    element={<Login onLogin={checkAuth}/>}                
                />
            </Routes>
        </BrowserRouter>
    )
}



               
