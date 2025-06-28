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
                { title && <h1>{title}</h1> }
                <div className="py-4 px-0 sm:px-14">
                    {children}
                </div>
            </MainContainer>
        </CenterContent>
    )
}

export default MiddleDiv;