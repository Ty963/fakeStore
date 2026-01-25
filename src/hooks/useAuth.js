import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext/UserContext.jsx';

export function useAuth() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used inside UserProvider');
    }
    return context;
}