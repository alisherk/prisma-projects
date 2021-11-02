import { graphqlTestCall } from '../../../test-utils/graphalTestCall';
import { mockCtx } from '../../../test-utils/setup';

const registerMutation = `
mutation($registerData: UserInput!) {
register(data: $registerData) {
    lastName
    email
    firstName
    }
}
`;

it('creates a user', async () => {

  const user = {
    id: 1,
    email: 'bob2@bob.com',
    firstName: 'Bob',
    lastName: 'Bob2',
    password: '36373933838',
  };

  mockCtx.prisma.user.create.mockResolvedValue(user);

  const response  = await graphqlTestCall(registerMutation, {
    registerData: {
      email: 'bob2@bob.com',
      firstName: 'Bob',
      lastName: 'Bob2',
      password: '36373933838',
    },
  });

  expect(response).toMatchObject({
    data: {
      register: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    }
  });
});
