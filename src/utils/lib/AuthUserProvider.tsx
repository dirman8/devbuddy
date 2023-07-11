import { createContext, useContext } from "react"
import useFirebaseAuth from "./useFirebaseAuth";
import firebase from "../db/firebaseConfig";

interface AuthUserContextType {
  authUser: firebase.User | null;
  loading: boolean;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
  createUsersCollection: () => Promise<void>;
}

const authUserContext = createContext<AuthUserContextType>({
    authUser: null,
    loading: true,
    signInWithEmailAndPassword: async (email, password) => {
    throw new Error("signInWithEmailAndPassword not implemented");
  },
  createUserWithEmailAndPassword: async (email, password) => {
    throw new Error("createUserWithEmailAndPassword not implemented");
  },
  signOut: async () => {
    throw new Error("signOut not implemented");
  },
  createUsersCollection: async () => {
  throw new Error("createUsersCollection not implemented");
  },
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
