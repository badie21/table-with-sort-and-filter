import { Dispatch } from "redux";
import { ActionType } from "./../action-types/index";
import {
	FilterField,
	ResetSort,
	SortField,
	PageSelect,
} from "./../actions/index";

export const sortField = (
	sortField: string,
	sortType: "asc" | "dsc"
): SortField => {
	return {
		type: ActionType.SORT_FIELD,
		payload: {
			sortField,
			sortType,
		},
	};
};

export const filterField = (field: string): FilterField => {
	return {
		type: ActionType.FILTER_FIELD,
		payload: field,
	};
};

export const resetSort = (): ResetSort => {
	return {
		type: ActionType.RESET_SORT,
	};
};

export const pageSelect = (page: number): PageSelect => {
	return {
		type: ActionType.PAGE_SELECT,
		payload: page,
	};
};
