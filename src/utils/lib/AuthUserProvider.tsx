import { createContext, useContext } from "react"
import useFirebaseAuth from "./useFirebaseAuth";

const authUserContext = createContext({
    authUser: null,
    loading: true,
    signInWithEmailAndPassword: async (mail: string, password: string) => {},
    // (email, password) => {},
    createUserWithEmailAndPassword: async (email: string, passwordOne: string) => Promise<Credential | void>,
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

