import { gql } from '@apollo/client';
import { client } from '../cache/cache';

const GET_USERS = gql`
  query users {
    users {
      email
      fullName
    }
  }
`;

export const ReadCashedUsers: React.FC = () => {
  const data= client.readQuery({ query: GET_USERS });

  return (
    <div>
      <h2> User directly from cache </h2>
      {data?.users?.map((user: any) => (
        <p key={user.email}>
          {user.fullName} - {user.email}
        </p>
      ))}
    </div>
  );
};
