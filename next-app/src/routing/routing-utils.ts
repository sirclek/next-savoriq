import type { Id, Maybe } from '@/common/common-types';
import { isNil } from '@/common/common-utils';
import type { WhiskeyFilterArgs } from '@/search/search-types';
import { Flavour } from '../common/object-types';

function parseToSearchParams(
  params: Maybe<Record<string, Maybe<string | string[]>>>,
) {
  const searchParams = new URLSearchParams();

  function appendParam(key: string, value: Maybe<string>) {
    if (!isNil(value)) {
      searchParams.append(key, value);
    }
  }

  for (const [key, value] of Object.entries(params ?? {})) {
    if (Array.isArray(value)) {
      for (const valueItem of value) {
        appendParam(key, valueItem);
      }
    } else {
      appendParam(key, value);
    }
  }

  return searchParams;
}

// https://stackoverflow.com/a/55247867/10876256
type RequiredKeys<T> = {
  [K in keyof T]-?: object extends { [P in K]: T[K] } ? never : K;
}[keyof T];

type HasRequiredField<T> = RequiredKeys<T> extends never ? false : true;

type CreateRouteArgs = {
  params?: unknown;
  query?: Record<string, Maybe<string | string[]>>;
};

type CreateRouteResult<RouteArgs extends CreateRouteArgs> = (
  // args parameter is optional when both of params and query fields are optional
  ...args: HasRequiredField<RouteArgs> extends true ? [RouteArgs] : [RouteArgs?]
) => string;

function createRoute<RouteArgs extends CreateRouteArgs>(
  getPathname: (pathParams: RouteArgs['params']) => string,
): CreateRouteResult<RouteArgs> {
  return (...args) => {
    const [routeArgs] = args;
    const pathname = getPathname(routeArgs?.params);
    const search = parseToSearchParams(routeArgs?.query).toString();
    return `${pathname}${search ? `?${search}` : ''}`;
  };
}

// TODO: Will check the use cases for these.
// type RouteArgs<T extends AnyFunction> = NonNullable<Parameters<T>[0]>;
// type PathParams<T extends AnyFunction> = RouteArgs<T>['params'];
// type QueryParams<T extends AnyFunction> = RouteArgs<T>['query'];

export const routes = {
  home: createRoute(() => '/'),
  search: createRoute<{ query?: WhiskeyFilterArgs }>(() => '/search'),
  whiskey: createRoute<{ params: { whiskeyId: Id } }>(
    (params) => `/whiskeys/${params.whiskeyId}`,
  ),

  // routing-utils.ts
  explore: createRoute(() => '/explore'),
  learnmore: createRoute(() => '/learnmore'),
  chemical: createRoute(() => '/chemical'),
  flavour: createRoute(() => '/flavour'),
  chemicalVisualize: (whiskeyId: number) => `/chem-visual/${whiskeyId}`,
  flavourVisualize: (whiskeyId: number) => `/flav-visual/${whiskeyId}`,

};

// TODO: Will check the use cases for this.
// export function createUrl(pathname: string, searchParams?: URLSearchParams) {
//   const paramsString = searchParams?.toString();
//   const queryString = paramsString ? `?${paramsString}` : '';
//   return `${pathname}${queryString}`;
// }
