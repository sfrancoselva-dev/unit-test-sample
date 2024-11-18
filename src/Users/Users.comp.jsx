const Users = ({ users }) => (
  <div className="users">
    {users.map(({ id, name }) => (
      <p key={id} className="user-name">
        {name}
      </p>
    ))}
  </div>
);

export default Users;
