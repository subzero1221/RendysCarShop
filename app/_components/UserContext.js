"use client";

const { createContext, useState, useContext } = require("react");

const UserContext = createContext();
const initialState = {
  name: undefined,
  email: undefined,
  photo: undefined,
  id: undefined,
};
function UserProvider({ children }) {
  const [user, setUser] = useState(initialState);
  const resetUser = () => setUser(initialState);

  return (
    <UserContext.Provider value={{ user, setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Context was used outside of PROVIDER");
  }
  return context;
}

export { UserProvider, useUser };
