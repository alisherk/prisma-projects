import { Field, InputType } from 'type-graphql';
import { MaxLength, IsEmail, Validate } from 'class-validator';
import { isEmailExists } from './custom-validator';

@InputType()
export class UserInput {
  @Field()
  @MaxLength(5)
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;

  @Field()
  @IsEmail()
  @Validate(isEmailExists, {
    message: 'Email is already in user'
  })
  email: string;

  @Field()
  @MaxLength(30)
  password: string;
}
