import { ReactNode } from "react";

interface CenterContentProps {
    width?: string;
    centerY: boolean;
    children: ReactNode;
}

const CenterContent: React.FC<CenterContentProps> = ({ width, centerY, children }) => {
    return (
        <div className={'absolute right-1/2 ' + (centerY ? 'top-1/2 ' : '') + (width ?? '')} style={{ transform: centerY ? 'translate(50%, -50%)' : 'translateX(50%)' }}>
            {children}
        </div>
    )
}

export default CenterContent;