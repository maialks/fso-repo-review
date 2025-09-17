export interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

type FontWeightKey = 'normal' | 'bold';
type FontWeightValue = '400' | '700';

export interface Theme {
  colors: Record<string, string>;
  fontSizes: {
    body: number;
    heading: number;
    subheading: number;
  };
  fonts: {
    main: string;
  };
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
