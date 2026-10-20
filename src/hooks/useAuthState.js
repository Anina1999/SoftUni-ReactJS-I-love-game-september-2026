import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function useAuthState() {
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    //restore the logged in user after page reload
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser
                ? { uid: firebaseUser.uid, email: firebaseUser.email }
                : null
            );
            setIsAuthReady(true);
        });

        return unsubscribe;
    }, []);

    return { user, setUser, isAuthReady };
}
