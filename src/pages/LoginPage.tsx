import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/slices/authSlice";

const TestUser = {
  email : "user@example.com",
  password : "string"
}

export default function LoginPage() {
    const dispatch = useDispatch();
    
    const state = useSelector(
        (state) => state.auth
    );

    const handleLogin = async () => {
        dispatch(login(TestUser))
        
    }

    
    
    return <>
        <h1>Login Page</h1>
        <button onClick={handleLogin} >Login</button>
        <h1>{JSON.stringify(state)}</h1>
    </>
}