import {
  ApiBody,
  ApiPropertyOptions,
  ApiQuery,
  ApiQueryOptions,
} from '@nestjs/swagger';
import { createApiPropertyDecorator } from '@nestjs/swagger/dist/decorators/api-property.decorator';

import { Transform, Type } from 'class-transformer';
import { Allow, ValidateNested } from 'class-validator';

const builtInTypes = new Set<any>([
  String,
  Number,
  Boolean,
  Date,
  Object,
  Array,
]);
const duplicateDTOs = new Map<string, Record<string, any>>();

/**
 * An enhanced @ApiProperty which supports:
 * 1. check duplicate DTOs
 * 2. whitelist DTO properties so that json request body can be safely deserialized (non-whitelisted properties will be ignored)
 * 3. Auto add @ValidatedNested if a property is a constructor
 */
export function ApiProperty(
  options: ApiPropertyOptions = {},
): PropertyDecorator {
  return (target, property) => {
    const dto = duplicateDTOs.get(target.constructor.name);
    if (dto) {
      if (dto !== target) {
        throw new Error(`Duplicate DTO found: "${target.constructor.name}"`);
      }
    } else {
      duplicateDTOs.set(target.constructor.name, target);
    }

    Allow()(target, property);
    if (
      options?.type &&
      !builtInTypes.has(options.type) &&
      (typeof options?.type === 'function' ||
        typeof options?.type?.[0] === 'function')
    ) {
      const type = Array.isArray(options.type) ? options.type[0] : options.type;
      Type(() => type)(target, property);
      ValidateNested()(target, property);
    } else if (!options?.type) {
      const type = Reflect.getMetadata('design:type', target, property);
      if (type && !builtInTypes.has(type)) {
        Type(() => type)(target, property);
        ValidateNested()(target, property);
      }
    }
    return createApiPropertyDecorator(options)(target, property);
  };
}

export function ApiPropertyOptional(
  options: ApiPropertyOptions = {},
): PropertyDecorator {
  return ApiProperty({
    ...options,
    required: false,
  });
}

export const ApiDateProperty = (
  options?: Omit<ApiPropertyOptions, 'type' | 'example'>,
) => {
  return ApiProperty({
    ...options,
    type: String,
    example: '2021-08-09T00:45:02.508Z',
  });
};

// export const TransformTimestamp = () => {
//   return Transform((ts: any) => {
//     if (ts instanceof Timestamp) {
//       return ts.toDate().toISOString();
//     }
//     return ts;
//   });
// };

export const ApiFile =
  (fileName: string) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };

const defaultPageNoQueryOptions = {
  name: 'pageNo',
  required: true,
  example: '1',
  description: 'Must be greater than 0.',
};
const defaultPageSizeQueryOptions = {
  name: 'pageSize',
  required: true,
  example: '20',
  description: 'Must be greater than 0.',
};

export const ApiPageQuery = (
  pageNoOptions?: ApiQueryOptions,
  pageSizeOptions?: ApiQueryOptions,
) => {
  return function <T>(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ): TypedPropertyDescriptor<T> | void {
    ApiQuery({ ...defaultPageNoQueryOptions, ...pageNoOptions })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ ...defaultPageSizeQueryOptions, ...pageSizeOptions })(
      target,
      propertyKey,
      descriptor,
    );
  };
};

/**
 * Nestjs cannot parse array query params in a consistent way.
 *
 * For example, for `a:string[]`, the query  `a=1` and `a=1&a=2` would yield different results: a=1 and a=[1,2].
 *
 * This decorator makes the parse result always be an array.
 */
export const TransformArray = () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Object, propertyKey: string | symbol) {
    return Transform(params => {
      const { value } = params;
      if (!value) {
        // ignore empty string
        return;
      }
      if (typeof value === 'string') {
        return [value];
      }
      return (value as string[]).filter(val => val?.length);
    })(target, propertyKey);
  };
};

// issues: https://github.com/typestack/class-transformer/issues/550
export const TransformBoolean = () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Object, propertyKey: string | symbol) {
    return Transform(param => {
      const map: any = { true: true, false: false };
      const value = param.obj?.[param.key];
      return map[value] ?? (value || undefined);
    })(target, propertyKey);
  };
};
