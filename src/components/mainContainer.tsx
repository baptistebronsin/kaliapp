import { ReactNode } from "react";

const MainContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="py-3 px-6 border rounded-md p-10 bg-white">
            {children}
        </div>
    )
}

export default MainContainer;