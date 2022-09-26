import { createContext } from "react";

interface Project {
  id: number
  name: string
  description: string
}
interface Person {
  id: number
  name: string
}
export interface AppContextInterface {
  currentUser?: Person
  activeProject?: Project
}

const defaultCtx: AppContextInterface = {
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

export const AppCtx = createContext<AppContextInterface | null>(defaultCtx);

// Provider in your app
