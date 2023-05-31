import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isDefined,
} from 'class-validator';
import {IsOptional} from 'class-validator';

export function IsIsoString(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isIsoString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (isDefined(value) && typeof value !== 'string') {
            return false;
          }

          // Validate the string against the ISO format
          return (
            isDefined(value) &&
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value)
          );
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          const property = validationArguments?.property;
          if (property) {
            return `${property} must be a valid ISO string or undefined`;
          }
          return 'Invalid ISO string or undefined';
        },
      },
    });

    // Add @IsOptional() decorator to make the property optional
    IsOptional()(object, propertyName);
  };
}
