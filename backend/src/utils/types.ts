export type ReqQuery = {
  filters: string;
  sort: string;
  sortOrder: string | number;
  limit: number;
  skip: number;
  search?: string;
};

export type UserRole = 'viewer' | 'admin' | 'superuser';
