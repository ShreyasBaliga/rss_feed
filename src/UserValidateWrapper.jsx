import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './services/firebase';
import { set, unset } from './store/slices/userSlice';

export default function UserValidateWrapper(props) {
    const { children } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const { displayName, email, uid } = user;
                dispatch(set({ displayName, email, uid }));
            } else
                dispatch(unset())
        });
    }, [dispatch]);

    return children;
}