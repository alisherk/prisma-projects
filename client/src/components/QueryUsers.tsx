import { useQuery, gql } from '@apollo/client';

interface Props {}

const USERS_QUERY = gql`
  query users {
    users {
      email
      fullName
      id
    }
  }
`;

export const QueryUsers: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(USERS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <p> ...Loading </p>;

  if (error)
    return <p> Oops there is an error: {error.networkError?.message} </p>;

  return data.users.map((user: any) => (
    <p key={user.email}>
      {user.fullName} - {user.email}
    </p>
  ));
};
