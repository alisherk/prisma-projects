import { gql, useMutation } from '@apollo/client';
import { FormEvent, useRef } from 'react';

// Define mutation
const CREATE_USER = gql`
  mutation createUser($email: String!, $fullName: String!) {
    createUser(data: { email: $email, fullName: $fullName}) {
        fullName 
        email 
    }
  }
`;

const USERS_QUERY = gql`
  query users {
    users {
      email
      fullName
    }
  }
`;

interface Props {}

export const CreateUser: React.FC<Props> = () => {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [createUser] = useMutation(CREATE_USER, {
      refetchQueries: [USERS_QUERY]
  });


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    return createUser({
      variables: {
        email: emailInputRef.current?.value,
        fullName: nameInputRef.current?.value,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' id='name' ref={nameInputRef} />
      <input type='email' id='email' ref={emailInputRef} />
      <button> Create User</button>
    </form>
  );
};
