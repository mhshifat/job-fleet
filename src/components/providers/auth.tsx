"use client";

import { createContext, DispatchWithoutAction, PropsWithChildren, useCallback, useContext, useEffect, useReducer, useState } from "react"
import Spinner from "../shared/spinner";
import { usePathname } from "next/navigation";
import { IUser } from "@/domain/user/user";
import { storage } from "@/utils/storage";
import { authService } from "@/infra/auth/service";

interface AuthContextState {
  user: IUser | null;
  forceUpdate: DispatchWithoutAction;
  updateUser: ({ token, user }: {
    token: string;
    user: IUser;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextState | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const pathname = usePathname();
  const [renderedState, forceUpdate] = useReducer((x) => x + 1, 0);
  
  const updateUser = useCallback(async ({
    token,
    user
  }: {
    token: string,
    user: IUser
  }) => {
    if (token) await storage.setAuthToken(token);
    setUser(user);
  }, [])

  useEffect(() => {
    (async () => {
      setInitializing(true);
      const token = await storage.getAuthToken();
      if (!token) return setInitializing(false);
      const user = await authService.getMe(token as string);
      setUser(user);
      setInitializing(false);
    })()
  }, [renderedState])

  if (initializing) return <Spinner fixed variant="secondary" size="layout" />;
  return (
    <AuthContext.Provider value={{
      user,
      forceUpdate,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const res = useContext(AuthContext);
  if (!res) throw new Error("Component needs to be wrapped within `AuthProvider`");
  return res;
}