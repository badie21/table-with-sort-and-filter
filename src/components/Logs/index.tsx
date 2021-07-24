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

const Logs: React.FC = () => {
	const [page, setPage] = useState<number>(1);
	const [showData, setShowData] = useState<ShowData[] | []>([]);
	const [countPerPage, setCountPerPage] = useState(10);
	const [filteredData, setFilteredData] = useState<ShowData[]>([]);

	const handePagination = (selectedPage: number) => {
		setPage(selectedPage);
	};

	const handleFilter = useCallback((filteredvalues: FilterFormState) => {
		const entries = Object.entries(filteredvalues);
		let shows: any = data;
		shows = shows.map((el: ShowData) => {
			return { ...el, checked: false };
		});

		entries.forEach((field) => {
			if (Array.isArray(data)) {
				shows = shows.filter((el: ShowData) => {
					const key: string = field[0];
					if (el[key].toLowerCase().includes(filteredvalues[key].toLowerCase()))
						return el;
				});
			}
		});
		setFilteredData(shows);
		setPage(1);
	}, []);

	useEffect(() => {
		console.log("hello");

		if (filteredData) {
			console.log(page * countPerPage - countPerPage);

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
		}
	}, [filteredData, page, countPerPage]);

	const handleSort = (field: string, type: string) => {
		let newRecords = [...filteredData];
		newRecords = newRecords.sort((a: ShowData, b: ShowData) => {
			if (field === "id") {
				return type === "asc" ? a.id - b.id : b.id - a.id;
			} else {
				return type === "asc"
					? new Date(a.date) - new Date(b.date)
					: new Date(b.date) - new Date(a.date);
			}
		});
		console.log(newRecords);
		setFilteredData(newRecords);
	};

	return (
		<div>
			<FilterForm handleFilter={handleFilter} />
			<Table sortFunction={handleSort} dataSource={showData} />
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
