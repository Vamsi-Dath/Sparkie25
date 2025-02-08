import React, { createContext, useContext, useState, useEffect } from "react";
import { authSession, signout } from "../../api/apiService";
import { SessionData } from "../../api/apiTypes";

interface SessionContextType {
  session: SessionData | null;
  updateSession: () => void;
}

// Create a context with default values
const SessionContext = createContext<SessionContextType>({
  session: null,
  updateSession: () => {},
});

// A custom hook to access session data
export const useSession = () => {
  const context = useContext(SessionContext);
  return context;
};

// Provider component to wrap app with session
export const SessionProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [refreshSession, setRefreshSession] = useState(false);

  // Function to trigger a session update
  const updateSession = () => setRefreshSession((prev) => !prev);

  // Runs upon updates
  useEffect(() => {
    const CheckAuth = async () => {
      try {
        const response = await authSession();
        setSession(response);
      } catch (error) {
        setSession({
          isSignedIn: false,
          email: "",
          name: "",
          picture: "",
        });
        try {
          await signout();
        } catch (error) {
          console.log(error);
        }
      }
    };

    CheckAuth();
  }, [refreshSession]);

  return (
    <SessionContext.Provider
      value={{
        session,
        updateSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
