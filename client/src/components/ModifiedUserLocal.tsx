import { gql, useQuery } from '@apollo/client';

const USERS_QUERY = gql`
  query users {
    users {
      email
      fullName
      emailWithMark @client
    }
  }
`;

export const ModifiedUserLocal: React.FC = () => {
  const { data } = useQuery(USERS_QUERY);

  console.log(data)

  return (
    <div>
      <h2> Locally added property on cached item</h2>
      {data?.users?.map((user: any) => (
        <p key={user.email}>
          {user.fullName} {user.emailWithMark}
        </p>
      ))}
    </div>
  );
};
