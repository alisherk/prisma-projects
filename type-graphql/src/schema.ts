import { AuthChecker, buildSchema } from 'type-graphql';
import { RegisterUserResolver } from './resolvers/register-resolver/register-resolver';
import { LoginUserResolver } from './resolvers/login-resolver/login-resolver';
import { PasswordResolver } from './resolvers/password/password-resolver';
import { LogoutResolver } from './resolvers/logout/logout-resolver';
import { CreateUserResolver } from './resolvers/createResolver';
import { Context } from './context';

export const customAuthChecker: AuthChecker<Context> = ({
  context: { req },
}) => {
  if (!req.session.cookie) return false;
  return true;
};

export const createSchema = async () =>
  buildSchema({
    resolvers: [
      RegisterUserResolver,
      LoginUserResolver,
      PasswordResolver,
      LogoutResolver,
      CreateUserResolver,
    ],
    validate: true,
    authChecker: customAuthChecker,
  });
