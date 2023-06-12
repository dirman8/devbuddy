import { createContext, useContext } from "react"
import useFirebaseAuth from "./useFirebaseAuth";
import firebase from "../db/firebaseConfig";

const authUserContext = createContext({
    authUser: null,
    loading: true,
    signInWithEmailAndPassword: async (email: string, password: string) => Promise<firebase.auth.UserCredential>,
    // (email, password) => {},
    createUserWithEmailAndPassword: async (email: string, password: string) => Promise<firebase.auth.UserCredential>,
    // (email, passwordOne) => {},
    signOut: async () => {}
});

function AuthUserProvider({children}) {
  const auth = useFirebaseAuth();
  return(
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  )
}


//custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);

export default AuthUserProvider

