import { useQuery, gql } from '@apollo/client';

interface Props {}

const USERS_QUERY = gql`
  query user($email: String!) {
    user(email: $email) {
      email
      fullName
    }
  }
`;

export const QueryUser: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(USERS_QUERY, {
    variables: { email: "test@yahoo.com" },
  });

  if (loading) return <p> ...Loading </p>;

  if (error) return <p> Oops there is an error: {error.networkError?.message} </p>;

  return <p key={data.user.email}>{data.user.email}</p>
};
