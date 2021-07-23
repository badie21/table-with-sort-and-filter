import { ActionType } from "./../action-types/index";

export interface SortField {
	type: ActionType.SORT_FIELD;
	payload: {
		sortField: string;
		sortType: "asc" | "dsc";
	};
}

export interface FilterField {
	type: ActionType.FILTER_FIELD;
	payload: string;
}

export interface ResetSort {
	type: ActionType.RESET_SORT;
}

export interface PageSelect {
	type: ActionType.PAGE_SELECT;
	payload: number;
}

export type Action = FilterField | SortField | ResetSort | PageSelect;
