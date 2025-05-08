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
        <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="mr-12">{label}:</span>
            <span className="relative inline-block w-8 h-8">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    className="peer absolute opacity-0 w-8 h-8 cursor-pointer m-0 p-0"
                />
                <span className="block w-8 h-8 rounded-[5px] border border-[#020056] bg-white transition-colors duration-150"></span>
                {checked && (
                    <svg
                        className="absolute left-1 top-1 w-6 h-6 text-[#020056] pointer-events-none"
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 7L6 12L16.5 1.5"
                            stroke="#020056"
                            stroke-width="2"
                        />
                    </svg>
                )}
            </span>
        </label>
    );
};

export default Checkbox;
