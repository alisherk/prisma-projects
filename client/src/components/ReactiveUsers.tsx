import { localUserVar } from '../cache/cache';




export const ReactiveUsers: React.FC = () => {
  const users = localUserVar();

  const addNewUser = () => {
    const user = {
      id: '2',
      email: 'miley@yahoo.com',
      fullName: 'Miley Sirus',
    };
    localUserVar([...users, user]);
  };

  return (
    <div>
      <h2> Reactive users</h2>
      {users.map((user) => (
        <p>
          {user.fullName} - {user.email}
        </p>
      ))}
      <button onClick={addNewUser}> Add new user</button>
    </div>
  );
};
