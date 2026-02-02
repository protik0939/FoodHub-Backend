export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getPaginationParams = (query: any): PaginationParams => {
  const page = Number.parseInt(query.page) || 1;
  const limit = Number.parseInt(query.limit) || 10;
  const search = query.search as string | undefined;
  const sortBy = query.sortBy as string | undefined;
  const sortOrder = (query.sortOrder as 'asc' | 'desc') || 'desc';

  const params: PaginationParams = { page, limit, sortOrder };
  if (search !== undefined) params.search = search;
  if (sortBy !== undefined) params.sortBy = sortBy;
  
  return params;
};

export const calculateSkip = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

export const formatPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> => {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
