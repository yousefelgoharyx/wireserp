import { useLocalStorage } from '@mantine/hooks';
import axios from 'axios';
import { LoginFormValues } from 'login';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupFormValues } from 'signup';
type Context = {
    user: SignupFormValues;
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
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const signup = async (user) => {
        setErrors(null);
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
            setErrors(err.response.data);
        }
    };
    const login = async (user: LoginFormValues) => {
        setErrors(null);
        setStatus('loading');
        try {
            const res = await axios.post(
                'http://erp.digitwires.com/api/auth/login',
                user
            );

            setUser({
                email: user.email,
                password: user.password,
            });
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
