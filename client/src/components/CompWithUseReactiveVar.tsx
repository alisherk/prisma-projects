import { useReactiveVar } from '@apollo/client';
import { localUserVar } from '../cache/cache';

export const CompWithUseReactiveVar: React.FC = () => {
  const users = useReactiveVar(localUserVar);

  const addUser = () => {
     localUserVar([{ id: '2', fullName: 'Jon T', email: 'jon@yahoo.com'}])
  }


  return (
    <div onClick={addUser}>
      <h2> Component with useReactiveVar hook </h2>
      {users.map((user: any) => (
        <p key={user.id}>
          {user.fullName} - {user.email}
        </p>
      ))}
    </div>
  );
};
