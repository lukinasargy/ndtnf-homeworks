import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

const isValidID = (val: string) => {
  if (typeof val !== 'string') {
    throw new BadRequestException('The value passed as ID is not a string');
  }
  const ObjectId = require('mongoose').Types.ObjectId;
  return ObjectId.isValid(val);
};
@Injectable()
export class ParseIdPipe implements PipeTransform<string> {
  protected exceptionFactory: (errors: string) => any;
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    if (!isValidID(value)) {
      throw new BadRequestException(
        'The value passed as ID is not Mongoose ObjectID type',
      );
    }
    return value;
  }
}
