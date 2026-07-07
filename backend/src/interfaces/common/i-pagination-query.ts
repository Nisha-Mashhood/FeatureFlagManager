import { SortOrder } from "@/types/sort-order";

export interface IPaginationQuery {
    page: number;

    limit: number;

    search?: string;

    sortBy?: string;

    sortOrder?: SortOrder;
}