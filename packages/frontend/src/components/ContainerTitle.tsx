import { memo } from "react";

interface ContainerTitleProps {
    title: string;
}

const ContainerTitle = memo(({ title }: ContainerTitleProps) => {
    return <h2 className="text-[clamp(32px,5vw,40px)] font-bold">{title}</h2>;
});

export default ContainerTitle;
