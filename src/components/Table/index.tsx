import { ShowData, SortState } from "../Logs";
import Checkbox from "./Checkbox";
import "./table.css";

interface TableProps {
	dataSource: ShowData[];
	sort: SortState;
	changeSort: (field: string) => void;
	loading: boolean;
}

const Table: React.FC<TableProps> = ({
	dataSource,
	sort,
	changeSort,
	loading,
}) => {
	const handleSelectedRow = (value: boolean, id: number) => {
		let selectedRows: any = localStorage.getItem("selected");

		if (!selectedRows) {
			selectedRows = [];
			selectedRows.push(id.toString());
		} else {
			selectedRows = JSON.parse(selectedRows);
			if (value) {
				selectedRows.push(id.toString());
			} else {
				selectedRows = selectedRows.filter(
					(el: string) => el !== id.toString()
				);
			}
		}
		localStorage.setItem("selected", JSON.stringify(selectedRows));
	};

	return (
		<div className="table-wrapper">
			<div className="sort-in-mobile">
				<div className="sort" onClick={() => changeSort("id")}>
					<span>بر اساس شناسه</span>
					<div className="sort-icons">
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
				<div className="sort" onClick={() => changeSort("date")}>
					<span>بر اساس تاریخ</span>
					<div
						className="sort-icons"
						style={{ display: "flex", flexDirection: "column" }}
					>
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
			</div>

			<table>
				<thead>
					<tr>
						<th>#</th>
						<th className="sortable">
							<div className="sort" onClick={() => changeSort("id")}>
								<span>شناسه</span>
								<div className="sort-icons">
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
							<div className="sort" onClick={() => changeSort("date")}>
								<span>تاریخ</span>
								<div className="sort-icons">
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
		</div>
	);
};

export default Table;
