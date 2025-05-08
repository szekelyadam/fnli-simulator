import NumberInput from "./NumberInput";

interface NumberContainerProps {
    label: string;
    numbers: number[];
    onChange?: (index: number, value: number) => void;
}

const NumberContainer = ({
    label,
    numbers,
    onChange,
}: NumberContainerProps) => {
    return (
        <>
            <div className="flex items-center">
                <p>{label}:</p>
            </div>
            <div className="flex flex-row gap-4">
                {numbers.map((number, index) => (
                    <NumberInput
                        key={index}
                        value={number}
                        disabled={onChange === undefined}
                        onChange={(value) => onChange?.(index, value)}
                    />
                ))}
            </div>
        </>
    );
};

export default NumberContainer;
