import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/login`,
            formData,{
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            setFormData({
                name: '',
                email: '',
                password: ''
            });
            toast.success('Login successful!');
            // navigate('/');
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
