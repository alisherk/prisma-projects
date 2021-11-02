import { PasswordMixin } from '../shared/PasswordInput';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User extends PasswordMixin(class {}) {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName?: string;

  @Field()
  email: string;
}
