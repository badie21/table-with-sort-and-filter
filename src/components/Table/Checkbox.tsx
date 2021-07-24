import { useState } from "react";

interface CheckboxProps {
	value: boolean | undefined;
	onSelect: (value: boolean, id: number) => void;
	id: number;
}

const Checkbox: React.FC<CheckboxProps> = ({ value, onSelect, id }) => {
	const [checkValue, setCheckValue] = useState(value);

	const handleCheckChange = () => {
		onSelect(!checkValue, id);
		setCheckValue((prev) => !prev);
	};

	return (
		<input
			itemType="boolean"
			type="checkbox"
			checked={checkValue}
			onChange={handleCheckChange}
		/>
	);
};
export default Checkbox;
