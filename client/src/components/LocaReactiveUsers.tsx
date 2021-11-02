import { localUserVar } from '../cache/cache';
import { gql, useQuery } from '@apollo/client';

const USERS_QUERY = gql`
  query users {
    localUsers @client
  }
`;

export const LocalReactiveUsers: React.FC = () => {
  const { data } = useQuery(USERS_QUERY);

  const newUser = {
    id: '2',
    fullName: 'Mike Tyson',
    email: 'mike@yahoo.com',
  };

  const addNewUser = () => {
    localUserVar([...localUserVar(), newUser]);
  };

  return (
    <div>
      <h2> Local Reactive users</h2>
      {data.localUsers?.map((user: any) => (
        <p key={user.id}>
          {user.fullName} - {user.email}
        </p>
      ))}
      <button onClick={addNewUser}> Add new user</button>
    </div>
  );
};
