import { ReactiveVar, makeVar } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          localUsers: {
            read() {
              return localUserVar();
            },
          },
          user: {
            read(existing, { toReference, args }) {
              const userRef = toReference({
                __typename: 'User',
                email: args?.email || '',
              });
              return existing ?? userRef;
            },
          },
        },
      },
      User: {
        keyFields: ['fullName'],
        fields: {
          emailWithMark: {
            read(_existing, { readField, toReference }) {
              const email = readField('email') as string;

              return `${email}!`;
            },
          },
        },
      },
    },
  }),
});

type User = {
  id: string;
  fullName: string;
  email: string;
};

const userInitialValue: User[] = [
  {
    id: '1',
    fullName: 'Alan',
    email: 'alan@yahoo.com',
  },
];

export const localUserVar: ReactiveVar<User[]> =
  makeVar<User[]>(userInitialValue);
