import { useLocalStorage } from '@mantine/hooks';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
type Context = {
    user: any;
    token: string;
    status: 'idle' | 'loading' | 'error';
    signup: (user: any) => void;
    login: (user: any) => void;
    logout: () => void;
};

const AuthContext = React.createContext<Context>(null);

export function useAuth() {
    return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage({
        key: 'user',
        defaultValue: null,
        getInitialValueInEffect: false,
    });
    const [token, setToken] = useLocalStorage({
        key: 'token',
        defaultValue: null,
        getInitialValueInEffect: false,
    });
    const [status, setStatus] = useState<Context['status']>('idle');
    const navigate = useNavigate();
    const signup = async (user) => {
        setStatus('loading');
        try {
            const res = await axios.post(
                'http://erp.digitwires.com/api/auth/register',
                user
            );
            setUser(user);
            setToken(res.data.token);
            setStatus('idle');
            navigate('/');
        } catch (err) {
            setStatus('error');
        }
    };
    const login = async (user) => {
        setStatus('loading');
        try {
            const res = await axios.post('/api/auth/login', user);
            setUser(res.data.user);
            setToken(res.data.token);
            setStatus('idle');
        } catch (err) {
            setStatus('error');
        }
    };
    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{ status, login, logout, signup, token, user }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
