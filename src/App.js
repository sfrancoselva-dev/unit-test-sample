import { useState, useEffect, useMemo } from "react";
import Users from "./Users/Users.comp";
import Search from "./Search/Search.comp";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  return (
    <div className="App">
      <Search
        placeholder="search users"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Users users={filteredUsers} />
    </div>
  );
}

export default App;
