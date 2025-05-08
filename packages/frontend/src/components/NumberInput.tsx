import { ChangeEvent } from "react";

interface NumberInputProps {
    value: number;
    disabled?: boolean;
    onChange: (value: number) => void;
}

const NumberInput = ({ value, onChange, disabled }: NumberInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        if (!isNaN(newValue) && newValue >= 1 && newValue <= 90) {
            onChange(newValue);
        }
    };

    return (
        <input
            type="number"
            min={1}
            max={90}
            value={value}
            disabled={!!disabled}
            onChange={handleChange}
            className="w-[34px] h-[38px] border border-primary shadow-[1px_1px_6px_0px_#00000026] rounded-lg text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
    );
};

export default NumberInput;
