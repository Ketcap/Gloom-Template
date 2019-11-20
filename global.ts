export interface Template {
  path: string;
  variables?: string[];
}

export type DJSON<T> = {
  [key: string]: T
}

export type Generator = DJSON<Template>;