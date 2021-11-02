import {
    Resolver,
    Mutation,
    Arg,
    ClassType,
    UseMiddleware, 
  } from "type-graphql";
  import { UserInput } from './register-resolver/UserInput';
  import { User } from './object-types/User'; 
  import { Ctx } from 'type-graphql';
  import { Context } from "../context";
  import { Middleware } from 'type-graphql/dist/interfaces/Middleware'


  function createResolver<T extends ClassType, X extends ClassType>(
    suffix: string,
    returnType: T,
    inputType: X,
    middleware?: Middleware<any>[]
  ) {
    @Resolver()
    class BaseResolver {
      @Mutation(() => returnType, { name: `create${suffix}` })
      @UseMiddleware(...(middleware || []))
      async create(@Arg("data", () => inputType) data: any, @Ctx() ctx: Context) {
        return ctx.prisma.user.create({ data })
      }
    }
    return BaseResolver;
  }
  
  
  export const CreateUserResolver = createResolver(
    "User",
    User,
    UserInput, 
  );
 