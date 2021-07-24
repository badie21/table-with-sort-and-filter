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
		const params = window.location.search.substring(1);
		if (params) {
			let newParams = params.split("&");
			const search: any = {};
			newParams.forEach((el) => {
				const param = el.split("=");
				console.log(param);
				search[param[0]] = param[1];
			});
			setInputs((prev) => {
				return { ...prev, ...search };
			});
		}
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			let newParams = "?";
			for (const key in inputs) {
				if (inputs[key]) {
					const element = inputs[key];
					console.log(element);
					newParams += `${key}=${inputs[key]}&`;
				}
			}

			newParams = newParams.slice(0, -1);

			const newurl =
				window.location.protocol +
				"//" +
				window.location.host +
				window.location.pathname +
				newParams;
			window.history.pushState({ path: newurl }, "", newurl);
			handleFilter(inputs);
		}, 750);
		return () => {
			clearTimeout(timer);
		};
		// handleFilter(inputs);
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
