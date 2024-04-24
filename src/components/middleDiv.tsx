import { ReactNode } from "react";
import CenterContent from "./centerContent";
import MainContainer from "./mainContainer";

interface MiddleDivProps {
    title?: string;
    children: ReactNode;
}

const MiddleDiv: React.FC<MiddleDivProps> = ({ title, children }) => {
    return (
        <CenterContent centerY={true}>
            <MainContainer>
                <h1>{title}</h1>
                <div className="py-4 px-14">
                    {children}
                </div>
            </MainContainer>
        </CenterContent>
    )
}

export default MiddleDiv;