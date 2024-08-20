import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

//  @argument ErrorType : if you need to assert your error type, just pass it as a generics via asserting with the as keyword
const handleOneLevelZodError = ({ issues }: ZodError<unknown>) => {
  return issues[0].message;
};

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      const errorMessage = handleOneLevelZodError(error);
      throw new BadRequestException(errorMessage);
    }
  }
}
