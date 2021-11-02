import { Context } from '../../context';
import bcrypt from 'bcrypt';
import { UserInput } from './UserInput';
import { User } from '../object-types/User';
import { isAuthed } from '../../middleware/isAuthed';
import { UserWhereInput } from '@generated/type-graphql';
import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Query,
  UseMiddleware,
  Subscription, 
  Root,
} from 'type-graphql';

@Resolver(User)
export class RegisterUserResolver {
  @Subscription(() => [User], {
    topics: 'UserUpdated'
  })
  userUpdated(@Root() payload: { email: string}, @Ctx() ctx: Context) {
    return ctx.prisma.user.findUnique({ where: { email: payload.email } });
  };
  @UseMiddleware(isAuthed)
  @Query(() => [User])
  async users(@Arg('whereinput', { nullable: true }) whereInput: UserWhereInput, @Ctx() ctx: Context) {
    const where = whereInput ?? {};

    return ctx.prisma.user.findMany({ where });
  }

  @Mutation(() => User)
  async register(
    @Arg('data') data: UserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const { password, ...newData } = data;

    const newUser = await ctx.prisma.user.create({
      data: {
        ...newData,
        password: hashedPassword,
      },
    });

    
    return newUser;
  }
}
