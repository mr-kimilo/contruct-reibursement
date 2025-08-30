import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // { name, department, role, ... }
  const [node, setNode] = useState(''); // 当前审批节点权限

  return (
    <UserContext.Provider value={{ user, setUser, node, setNode }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
