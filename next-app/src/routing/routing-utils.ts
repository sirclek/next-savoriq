import { isNil } from '@/common/common-utils';
import type { Id, MatchType, Maybe, name, WhiskeyFilterArgs } from '@/common/custom-types';

function parseToSearchParams(params: Maybe<Record<string, Maybe<string | string[]>>>) {
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

type RequiredKeys<T> = {
  [K in keyof T]-?: object extends { [P in K]: T[K] } ? never : K;
}[keyof T];

type HasRequiredField<T> = RequiredKeys<T> extends never ? false : true;

type CreateRouteArgs = {
  params?: unknown;
  query?: Record<string, Maybe<string | string[]>>;
};

type CreateRouteResult<RouteArgs extends CreateRouteArgs> = (
  ...args: HasRequiredField<RouteArgs> extends true ? [RouteArgs] : [RouteArgs?]
) => string;

function createRoute<RouteArgs extends CreateRouteArgs>(getPathname: (pathParams: RouteArgs['params']) => string): CreateRouteResult<RouteArgs> {
  return (...args) => {
    const [routeArgs] = args;
    const pathname = getPathname(routeArgs?.params);
    const search = parseToSearchParams(routeArgs?.query).toString();
    return `${pathname}${search ? `?${search}` : ''}`;
  };
}

export const routes = {
  home: createRoute(() => '/'),
  search: createRoute<{ query?: WhiskeyFilterArgs }>(() => '/search'),
  whiskey: createRoute<{ params: { whiskeyId: Id } }>((params) => `/whiskeys/${params.whiskeyId}`),

  chemicals: createRoute<{ params: { chemicalName: string } }>((params) => `/chemicals/${params.chemicalName}`),
  flavours: createRoute<{ params: { flavourName: string } }>((params) => `/flavours/${params.flavourName}`),

  learnmore: createRoute(() => '/learnmore'),
  similar: createRoute<{ params: { type: MatchType; values: string | Id } }>((params) => `/similar/${params.type}/${params.values}`),
  visulise: (whiskeyId: number) => `/visulise/${whiskeyId}`,
};

