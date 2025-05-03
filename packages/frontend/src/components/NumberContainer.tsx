interface NumberContainerProps {
    value: number;
    onChange?: (value: number) => void;
}

const NumberContainer = ({ value, onChange }: NumberContainerProps) => {
    return (
        <input
            type="number"
            value={value === undefined ? "" : value}
            disabled={!onChange}
            onChange={(e) => onChange?.(Number(e.target.value))}
        />
    );
};

export default NumberContainer;
