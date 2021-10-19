export type ReqQuery = {
  filters: string;
  sort: string;
  sortOrder: string | number;
  limit: number;
  skip: number;
  search?: string;
};
