import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, type DocumentData } from "firebase/firestore";
import { auth, firestoreDb } from "../services/firebase";
import type { LoginUserData, SignUpUserData } from "../@types/generics";

interface AuthContextType {
  user: User | null;
  userData: DocumentData;
  loading: boolean;
  register: (signUpUserData: SignUpUserData) => Promise<void>;
  login: (loginUserData: LoginUserData) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<DocumentData>(null);
  const [loading, setLoading] = useState(true);

  async function register(signUpUserData: SignUpUserData) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      signUpUserData.email,
      signUpUserData.password,
    );

    const firebaseUser = credential.user;

    await setDoc(doc(firestoreDb, "users", firebaseUser.uid), {
      uid: firebaseUser.uid,
      createdAt: new Date(),
      ...signUpUserData,
    });
  }

  async function login(loginUserData: LoginUserData) {
    await signInWithEmailAndPassword(
      auth,
      loginUserData.email,
      loginUserData.password,
    );
  }

  async function logout() {
    await signOut(auth);
  }

  async function loadUserData(uid: string) {
    const docRef = doc(firestoreDb, "users", uid);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      setUserData(snapshot.data());
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await loadUserData(firebaseUser.uid);
      } else {
        setUser(null);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
