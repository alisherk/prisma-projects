import { gql } from '@apollo/client';
import { client } from '../cache/cache';

export const ReadCachedUsersFragment = () => {
  const user = client.readFragment({
    id: 'User:cks6piok20018z33fuyxuzadp',
    fragment: gql`
      fragment User on User {
        email
        fullName
      }
    `,
  });

  console.log(user);

  return (
    <div>
      <h2> Reading one user with readFragment </h2>
      <p> {user.fullName} - {user.email} </p>
    </div>
  );
};
