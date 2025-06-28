import { ReactNode } from "react";

const MainContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="w-full sm:w-fit px-2 sm:px-6 py-1 sm:py-3 border rounded-md bg-white">
            {children}
        </div>
    )
}

export default MainContainer;