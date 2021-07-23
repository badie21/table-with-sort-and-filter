import "./table.css";
import Pagination from "../Pagination";
import { useState } from "react";
// {
//         "id": 1,
//         "name": "Mohammad Esmaeili",
//         "date": "2018-03-20",
//         "title": "چاپ پوستر های با کیفیت دیواری به ابعاد دلخواه",
//         "field": "عنوان",
//         "old_value": "یدک کش جرثقیل امداد",
//         "new_value": "تیگو 7 اکسلنت در حد صفر مدل 97"
//     }
// interface RecordProps {
// 	id: number;
// 	name: string;
// 	date: string;
// 	title: string;
// 	field: string;
// 	old_value: string;
// 	new_value: string;
// }

const Table: React.FC = () => {
	const [page, setPage] = useState(1);

	const handePagination = (selectedPage: number) => {
		setPage(selectedPage);
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Job Title</th>
						<th>Twitter</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td data-column="First Name">James</td>
						<td data-column="Last Name">Matman</td>
						<td data-column="Job Title">Chief Sandwich Eater</td>
						<td data-column="Twitter">@james</td>
					</tr>
				</tbody>
			</table>
			<Pagination
				page={page}
				totalRecord={190}
				countPerPage={25}
				handlePagination={handePagination}
			/>
		</div>
	);
};

export default Table;
