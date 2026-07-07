export interface IPaginatedResponse<T> {
    data: T[];

    currentPage: number;

    totalPages: number;

    totalCount: number;

    pageSize: number;
}