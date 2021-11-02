import { Context } from './mock-context';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export async function createUser(user: User, ctx: Context) {
  try {
    return await ctx.prisma.user.create({ data: user });
  } catch (error) {
    console.log(error);
    return null;
  }
}

interface UpdateUser {
  id: number;
  firstName: string;
  email: string;
}

export async function updateUsername(user: UpdateUser, ctx: Context) {
  return await ctx.prisma.user.update({
    where: { id: user.id },
    data: user,
  });
}
