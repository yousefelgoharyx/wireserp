import { useLocalStorage } from '@mantine/hooks';
import axios from 'axios';
import { LoginFormValues } from 'login';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'signup';

type Context = {
    user: User;
    token: string;
    status: 'idle' | 'loading' | 'error';
    errors: any;
    signup: (user: any) => void;
    login: (user: LoginFormValues) => void;
    logout: () => void;
};

const AuthContext = React.createContext<Context>(null);

export function useAuth() {
    return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage<User>({
        key: 'user',
        defaultValue: null,
        getInitialValueInEffect: false,
    });
    const [token, setToken] = useLocalStorage<string>({
        key: 'token',
        defaultValue: null,
        getInitialValueInEffect: false,
    });
    const [status, setStatus] = useState<Context['status']>('idle');
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const signup = async (user) => {
        setErrors(null);
        setStatus('loading');
        try {
            const res = await axios.post<User>(
                'https://erp.digitwires.com/api/auth/register',
                user
            );
            setUser(res.data);
            setToken(res.data.token);
            setStatus('idle');
            navigate('/');
        } catch (err) {
            setStatus('error');
            setErrors(err.response.data);
        }
    };
    const login = async (user: LoginFormValues) => {
        setErrors(null);
        setStatus('loading');
        try {
            const res = await axios.post<User>(
                'https://erp.digitwires.com/api/auth/login',
                user
            );

            setUser(res.data);
            setToken(res.data.token);
            setStatus('idle');
        } catch (err) {
            setStatus('error');
            setErrors(err.response.data);
        }
    };
    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{ errors, status, login, logout, signup, token, user }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
