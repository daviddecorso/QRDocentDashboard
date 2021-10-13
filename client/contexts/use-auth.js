import authContext from './auth';
import { useContext } from 'react';

export default function useAuth() {
    return useContext(authContext);
}
