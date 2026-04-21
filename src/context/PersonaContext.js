import { createContext, useContext, useState } from "react";

const PersonaContext = createContext();

export function PersonaProvider({ children }) {
  const [persona, setPersona] = useState("standard"); // default

  const switchPersona = (newPersona) => {
    setPersona(newPersona);
  };

  return (
    <PersonaContext.Provider value={{ persona, switchPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}