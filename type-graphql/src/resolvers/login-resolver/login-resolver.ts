import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { Context } from '../../context';
import bcrypt from 'bcrypt';
import { User } from '../object-types/User';


@Resolver()
export class LoginUserResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const existingUser = await ctx.prisma.user.findUnique({ where: { email } });

    if (!existingUser) return null;

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) return null;

    //@ts-ignore
    ctx.req.session.userId = existingUser.id

    return existingUser;
  }
}
