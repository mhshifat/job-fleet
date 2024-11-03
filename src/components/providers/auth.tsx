"use client";

import { createContext, DispatchWithoutAction, PropsWithChildren, useCallback, useContext, useEffect, useReducer, useState } from "react"
import Spinner from "../shared/spinner";
import { ILoginResponse } from "@/domain/auth/auth";
import useMeQuery from "@/domain/auth/use-me-query";

interface AuthContextState {
  authState: ILoginResponse | null;
  forceUpdate: DispatchWithoutAction;
  updateAuthState: (data: ILoginResponse | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextState | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const { data: meData, isLoading } = useMeQuery();
  const [authState, setAuthState] = useState<ILoginResponse | null>(null);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  
  const initializing = isLoading;
  const updateAuthState = useCallback(async (data: ILoginResponse | null) => {
    setAuthState(data);
    forceUpdate();
  }, [])

  if (initializing) return <Spinner fixed variant="secondary" size="layout" />;
  return (
    <AuthContext.Provider value={{
      authState: authState || meData || null,
      forceUpdate,
      updateAuthState
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