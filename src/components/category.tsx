import { ICategory } from "@/models/category";
import { useState } from "react";

interface CategoryProps {
    category: ICategory;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
    const [isVisible, setVisible] = useState<boolean>(false);

    return (
        <div
        className="w-48 h-48 py-2 border rounded-md flex flex-col justify-center items-center gap-2 text-lg cursor-pointer relative overflow-auto"
        style={{ borderColor: category.borderColor, backgroundColor: category.backgroundColor }}
        onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
        >
            {
                isVisible ? (
                    <>
                        <h1 className="m-0 p-0 text-center">{ category.name }</h1>
                        <p className="text-slate-500 m-0 p-0 w-full text-center">{ category.description }</p>
                    </>
                ) : (
                    <h1 className="m-0 p-0 text-center">{ category.name }</h1>
                )
            }
        </div>
    )
}

export default Category