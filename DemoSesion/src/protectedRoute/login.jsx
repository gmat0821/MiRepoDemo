import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login ({onLogin}){
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("1234");
    const navigate = useNavigate();
}