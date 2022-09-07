import { IsNumber, IsOptional } from "class-validator";

export class FindManyQuery {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  perPage?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions
) => Promise<PaginatedResult<T>>;

export type JwtPayload = {
  email: string;
  userId: string;
  name: string;
  username: string;
};

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
