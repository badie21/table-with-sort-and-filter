import { useEffect, useState } from "react";
import { ShowData } from "../Logs";
import Checkbox from "./Checkbox";
import "./table.css";

interface TableProps {
	dataSource: ShowData[];
	sortFunction: (field: string, type: string) => void;
}

interface SortState {
	sort: "asc" | "dsc" | null;
	field: string;
}

const Table: React.FC<TableProps> = ({ dataSource, sortFunction }) => {
	const [sort, setSort] = useState<SortState>({ field: "", sort: null });

	const handleSelectedRow = (value: boolean, id: number) => {
		console.log(value, id);
		let selectedRows: any = localStorage.getItem("selected");
		console.log(Boolean(selectedRows));

		if (!selectedRows) {
			selectedRows = [];
			selectedRows.push(id.toString());
		} else {
			selectedRows = JSON.parse(selectedRows);
			console.log(selectedRows);
			if (value) {
				selectedRows.push(id.toString());
			} else {
				selectedRows = selectedRows.filter(
					(el: string) => el !== id.toString()
				);
			}
		}
		console.log(selectedRows);

		localStorage.setItem("selected", JSON.stringify(selectedRows));
	};

	const handleSort = (field: string): void => {
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

	useEffect(() => {
		if (sort.sort) {
			sortFunction(sort.field, sort.sort);
		}
	}, [sort]);

	return (
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th className="sortable">
						<div className="sort" onClick={() => handleSort("id")}>
							<span>شناسه</span>
							<div>
								<span
									className={`arrow up ${
										sort.field === "id" && sort.sort === "asc" && "active"
									}`}
								></span>
								<span
									className={`arrow down ${
										sort.field === "id" && sort.sort === "dsc" && "active"
									}`}
								></span>
							</div>
						</div>
					</th>
					<th>نام تغییر دهنده</th>
					<th className="sortable">
						<div className="sort" onClick={() => handleSort("date")}>
							<span>تاریخ</span>
							<div>
								<span
									className={`arrow up ${
										sort.field === "date" && sort.sort === "asc" && "active"
									}`}
								></span>
								<span
									className={`arrow down ${
										sort.field === "date" && sort.sort === "dsc" && "active"
									}`}
								></span>
							</div>
						</div>
					</th>
					<th>نام آگهی</th>
					<th>فیلد</th>
					<th>مقدار قدیمی</th>
					<th>مقدار جدید</th>
				</tr>
			</thead>
			<tbody>
				{dataSource.map((el: ShowData) => {
					return (
						<tr key={el.id}>
							<td data-column="#">
								<Checkbox
									id={el.id}
									value={el.checked}
									onSelect={handleSelectedRow}
								/>
							</td>
							<td data-column="شناسه">{el.id}</td>
							<td data-column="نام تغییر دهنده">{el.name}</td>
							<td data-column="تاریخ">{el.date}</td>
							<td data-column="نام آگهی">{el.title}</td>
							<td data-column="فیلد">{el.field}</td>
							<td data-column="مقدار قدیمی">{el.old_value}</td>
							<td data-column="مقدار جدید">{el.new_value}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
