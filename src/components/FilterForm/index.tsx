import "./filter-form.css";
import { useEffect, useState } from "react";

interface FilterFormProps {
	handleFilter: (inputs: FilterFormState) => void;
}
export interface FilterFormState {
	name: string;
	date: string;
	title: string;
	field: string;
	[key: string]: any;
}

const FilterForm: React.FC<FilterFormProps> = ({ handleFilter }) => {
	const [inputs, setInputs] = useState<FilterFormState>({
		name: "",
		date: "",
		title: "",
		field: "",
	});

	const handleInputChange = (value: string, field: string): void => {
		setInputs((prev) => {
			return { ...prev, [field]: value };
		});
	};

	useEffect(() => {
		let url = new URL(window.location.href);

		let search_params = url.searchParams;

		const search: any = {};
		search_params.forEach(function (value, key) {
			search[key] = value;
		});
		setInputs((prev) => {
			return { ...prev, ...search };
		});
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			const url = new URL(window.location.href);
			const search_params = url.searchParams;
			for (const key in inputs) {
				if (inputs[key]) {
					search_params.set(key, inputs[key]);
				} else {
					search_params.delete(key);
				}
			}
			const newurl = url.toString();
			window.history.replaceState({ path: newurl }, "", newurl);
			handleFilter(inputs);
		}, 750);
		return () => {
			clearTimeout(timer);
		};
	}, [inputs, handleFilter]);

	return (
		<div className="form-wrapper">
			<div className="filter-form-item">
				<label>نام آگهی دهنده</label>
				<input
					type="text"
					value={inputs.name}
					onChange={(e) => handleInputChange(e.target.value, "name")}
				/>
			</div>
			<div className="filter-form-item">
				<label>تاریخ</label>
				<input
					type="date"
					value={inputs.date}
					onChange={(e) => handleInputChange(e.target.value, "date")}
				/>
			</div>
			<div className="filter-form-item">
				<label>نام آگهی</label>
				<input
					type="text"
					value={inputs.title}
					onChange={(e) => handleInputChange(e.target.value, "title")}
				/>
			</div>
			<div className="filter-form-item">
				<label>فیلد</label>
				<input
					type="text"
					value={inputs.field}
					onChange={(e) => handleInputChange(e.target.value, "field")}
				/>
			</div>
		</div>
	);
};

export default FilterForm;
