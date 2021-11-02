import { PubSubNameSpace } from '../services/pubsub';
import { User, UserCreateInput } from '@generated/type-graphql';
import { Context } from '../context';
import {
  Resolver,
  Ctx,
  Subscription,
  Root,
  Mutation,
  Arg,
  PubSub,
  PubSubEngine,
  Query,
} from 'type-graphql';

@Resolver(User)
export class CustomUserResolver {
  @Subscription(() => User, {
    topics: PubSubNameSpace.Event.UserAdded,
  })
  userUpdated(
    @Root() payload: PubSubNameSpace.UserPayload,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    return ctx.prisma.user.findUnique({ where: { email: payload.email } });
  }

  @Mutation(() => User)
  async addUser(
    @Arg('data', { nullable: false }) data: UserCreateInput,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() ctx: Context
  ): Promise<User> {
    const newUser = await ctx.prisma.user.create({ data });
    await pubSub.publish(PubSubNameSpace.Event.UserAdded, {
      email: newUser.email,
    });
    return newUser;
  }
  @Query(() => User)
  async user(@Arg('email') email: string, @Ctx() ctx: Context) {
    return ctx.prisma.user.findUnique({ where: { email } });
  }
}
