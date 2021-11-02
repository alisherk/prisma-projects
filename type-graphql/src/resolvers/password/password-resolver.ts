import { Mutation, Resolver, Ctx, Arg } from 'type-graphql';
import { Context } from '../../context';
import { sendEmail } from '../../services/email';
import { redis } from '../../services/redis';
import { User } from '../object-types/User';
import { ChangePasswordInput } from './ChangePasswordInput';
import bcrypt from 'bcrypt';

const FORGOT_PASSWORD_PREFIX = 'forgot-password-prefix';

Resolver();
export class PasswordResolver {
  @Mutation(() => Boolean)
  public async forgotPassword(
    @Arg('email') email: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const user = await ctx.prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = Math.floor(Math.random() * 100000000).toString();
      await redis.set(
        FORGOT_PASSWORD_PREFIX + token,
        user.id,
        'ex',
        60 * 60 * 24 //expiration set to 1 day
      );
      await sendEmail(
        email,
        `http://localhost:3000/user/forgot-password/${token}`
      );
    }

    return true;
  }

  @Mutation(() => User)
  public async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token);

    if (!userId) return null;

    await redis.del(FORGOT_PASSWORD_PREFIX + token);

    const id = parseInt(userId);

    const user = await ctx.prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    const newPassword = await bcrypt.hash(password, 12);

    const updatedUser = await ctx.prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });

    return updatedUser;
  }
}
