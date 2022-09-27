import { createContext, useEffect, useState } from "react";

// create context
interface Project {
  id: number
  name: string
  description: string
}
interface Person {
  id: number
  name: string
}
export interface UserStateContext {
  currentUser?: Person
  activeProject?: Project
}

const UserFormContext = createContext<UserStateContext | null>(null)

const defaultCtx: UserStateContext = {
  currentUser: {
    id: 0,
    name: 'Anonymous',
  },
  activeProject: {
    id: 0,
    name: 'Demo Project',
    description: 'Small survey project example'
  }
};

type PropsWithChildren = { [key: string]: any; children: any }
const UserFormContextProvider = ({ children }: PropsWithChildren) => {
  const [userState, setUserState] = useState<UserStateContext | null>(null);

  useEffect(() => {
    const fetchUserState = () => {
      new Promise<UserStateContext>((resolve) => { setTimeout(() => resolve(defaultCtx), 500) })
        .then((result) => setUserState(result))
        .catch((error) => console.log('Somehow failed to set user state'));
    };

    fetchUserState();
  }, []);

  return (
    <UserFormContext.Provider value={userState}>
      {children}
    </UserFormContext.Provider>
  );
};

export { UserFormContext, UserFormContextProvider };
