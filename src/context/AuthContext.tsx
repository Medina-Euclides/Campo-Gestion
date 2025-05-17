//contexto global para saber si un usuario esta logueado

import { createContext, useContext, useEffect, useState} from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    login: (token:string) => void;
    logout: () => void;
};

