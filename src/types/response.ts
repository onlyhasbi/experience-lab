type Results = {
  name: string;
  url: string;
};

export type Response = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Results>;
};
