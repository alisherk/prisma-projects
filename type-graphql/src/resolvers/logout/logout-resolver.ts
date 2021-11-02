import { Ctx, Resolver, Mutation } from 'type-graphql';
import { Context } from '../../context';


@Resolver(() => Boolean)
export class LogoutResolver {
  @Mutation(() => Boolean)
  public async logout(@Ctx() ctx: Context): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session.destroy(err => {
        if (err) {
          console.log(err);
          return rej(false);
        }
        ctx.res.clearCookie("qid");
        return res(true);
      })
    );
  }
}