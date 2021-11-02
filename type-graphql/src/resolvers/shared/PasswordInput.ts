import { InputType, ClassType } from "type-graphql";

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass {
    password: string;
  }
  return PasswordInput;
};