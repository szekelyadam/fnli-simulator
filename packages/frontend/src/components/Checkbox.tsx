interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <label>
            <input type="checkbox" checked={checked} onChange={handleChange} />
            <span>{label}</span>
        </label>
    );
};

export default Checkbox;
