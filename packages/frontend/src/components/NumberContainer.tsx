import { memo } from "react";

interface NumberContainerProps {
    value: number;
    onChange?: (value: number) => void;
}

const NumberContainer = memo(({ value, onChange }: NumberContainerProps) => {
    return (
        <input
            type="number"
            value={value}
            disabled={!onChange}
            onChange={(e) => onChange?.(Number(e.target.value))}
        />
    );
});

export default NumberContainer;
