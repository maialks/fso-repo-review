interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

interface Edge<T> {
  node: T;
  cursor: string;
}

export interface Repository {
  id: string;
  name: string;
  ownerName: string;
  createdAt: string;
  fullName: string;
  reviewCount: number;
  ratingAverage: number;
  forksCount: number;
  stargazersCount: number;
  description: string;
  language: string;
  ownerAvatarUrl: string;
}

export interface RepositoriesResponse {
  totalCount: number;
  edges: Edge<Repository>[];
  pageInfo: PageInfo;
}

type FontWeightKey = 'normal' | 'bold';
type FontWeightValue = '400' | '700';

export interface Theme {
  colors: Record<string, string>;
  fontSizes: Record<string, number>;
  fonts: Record<string, string>;
  fontWeights: {
    [key in FontWeightKey]: FontWeightValue;
  };
}

export type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthStorage {
  namespace: string;
  getAccessToken: () => Promise<string | null>;
  setAccessToken: (token: string) => Promise<void>;
  removeAccessToken: () => Promise<void>;
}

export interface AuthResult {
  authenticate: {
    accessToken: string;
  } | null;
}

export interface GraphQLAuthError {
  name: string;
  data: {
    authenticate: null;
  };
}
