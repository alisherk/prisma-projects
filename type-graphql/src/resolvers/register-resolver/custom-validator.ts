import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import prisma from '../../client';

@ValidatorConstraint({ async: true })
export class isEmailExists implements ValidatorConstraintInterface {
  validate(email: string) {
    return prisma.user.findUnique({ where: { email } }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}
