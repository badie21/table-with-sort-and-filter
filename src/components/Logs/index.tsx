import Pagination from "../Pagination";
import { useCallback, useEffect, useState } from "react";
import FilterForm, { FilterFormState } from "../FilterForm";
import data from "../../data/data.json";
import Table from "../Table";

export interface ShowData {
	id: number;
	name: string;
	date: string;
	title: string;
	field: string;
	old_value: string;
	new_value: string;
	checked?: boolean;
	[key: string]: any;
}

export interface SortState {
	sort: "asc" | "dsc" | null;
	field: string;
}

const Logs: React.FC = () => {
	const [page, setPage] = useState<number>(1);
	const [showData, setShowData] = useState<ShowData[] | []>([]);
	const [countPerPage, setCountPerPage] = useState(10);
	const [filteredData, setFilteredData] = useState<ShowData[]>([]);
	const [sort, setSort] = useState<SortState>({ field: "", sort: null });
	const [loading, setLoading] = useState(false);

	const handePagination = (selectedPage: number) => {
		setPage(selectedPage);
	};

	const changeSort = (field: string): void => {
		setLoading(true);
		if (sort.sort) {
			setSort((prev) => {
				return {
					field,
					sort: prev.sort === "asc" ? "dsc" : "asc",
				};
			});
		} else {
			setSort({ field, sort: "asc" });
		}
	};

	const handleFilter = useCallback(
		(filteredvalues: FilterFormState) => {
			setLoading(true);
			const entries = Object.entries(filteredvalues);
			let shows: any = data;
			shows = shows.map((el: ShowData) => {
				return { ...el, checked: false };
			});

			entries.forEach((field) => {
				if (Array.isArray(data)) {
					shows = shows.filter((el: ShowData) => {
						const key: string = field[0];
						if (
							el[key].toLowerCase().includes(filteredvalues[key].toLowerCase())
						)
							return el;
					});
				}
			});
			if (sort.field) {
				shows = shows.sort((a: ShowData, b: ShowData) => {
					if (sort.field === "id") {
						return sort.sort === "asc" ? a.id - b.id : b.id - a.id;
					} else {
						const firstDate = new Date(a.date).getTime();
						const secondDate = new Date(b.date).getTime();
						if (firstDate > secondDate) {
							return sort.sort === "asc" ? 1 : -1;
						} else {
							return sort.sort === "asc" ? -1 : 1;
						}
					}
				});
			}
			setFilteredData(shows);
			setPage(1);
		},
		[sort]
	);

	useEffect(() => {
		if (filteredData) {
			let showingData = filteredData?.slice(
				page * countPerPage - countPerPage,
				page * countPerPage - countPerPage + countPerPage
			);
			let selectedRows: any = localStorage.getItem("selected");
			if (selectedRows) {
				selectedRows = JSON.parse(selectedRows);
				showingData = showingData.map((el: ShowData): ShowData => {
					if (selectedRows.includes(el.id.toString())) {
						return { ...el, checked: true };
					} else {
						return el;
					}
				});
			}
			setShowData(showingData);
			setLoading(false);
		}
	}, [filteredData, page, countPerPage]);

	return (
		<div>
			<FilterForm handleFilter={handleFilter} />
			<Table
				loading={loading}
				sort={sort}
				changeSort={changeSort}
				dataSource={showData}
			/>
			<Pagination
				page={page}
				totalRecord={filteredData?.length}
				countPerPage={countPerPage}
				handlePagination={handePagination}
			/>
		</div>
	);
};

export default Logs;
