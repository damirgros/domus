export type Column<T, K extends keyof T = keyof T> = {
  key: K;
  title: string;
  render?: (value: T[K], row: T) => React.ReactNode;
};
