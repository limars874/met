import { RequestMapping } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { parse } from 'path-to-regexp';

const customMethodRegExp = /\[:][a-zA-Z-]+$/;
export const sanitizeApiPath = (path?: string): string | undefined => {
  if (!path) {
    return;
  }
  const [customMethod] = customMethodRegExp.exec(path) || [''];
  const head = path.replace(customMethodRegExp, '');
  return (
    parse(head).reduce((p, v) => {
      if (typeof v === 'string') {
        return `${p}${v}`;
      }
      if (typeof v.name === 'number') {
        throw new Error('Unnamed parameters are not supported => ' + path);
      }
      if (v.prefix !== '/') {
        throw new Error('Custom prefix is not supported => ' + path);
      }
      if (v.pattern === '[^\\/#\\?]+?' && v.modifier === '') {
        return `${p}${v.prefix}:${v.name}([^:/]+)${v.modifier}`;
      }
      if (v.pattern === '[^\\/#\\?]+?' && v.modifier === '?') {
        return `${p}${v.prefix}:${v.name}${v.modifier}`;
      }
      return `${p}${v.prefix}:${v.name}(${v.pattern})${v.modifier}`;
    }, '') + customMethod
  );
};

const createMappingDecorator = (method: RequestMethod) => (path?: string) => {
  return RequestMapping({
    path: sanitizeApiPath(path),
    method,
  });
};
export const Get = createMappingDecorator(RequestMethod.GET);
export const Post = createMappingDecorator(RequestMethod.POST);
export const Put = createMappingDecorator(RequestMethod.PUT);
export const Patch = createMappingDecorator(RequestMethod.PATCH);
export const Delete = createMappingDecorator(RequestMethod.DELETE);
export const Options = createMappingDecorator(RequestMethod.OPTIONS);
export const All = createMappingDecorator(RequestMethod.ALL);
export const Head = createMappingDecorator(RequestMethod.HEAD);
