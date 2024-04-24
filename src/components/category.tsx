import { ICategory } from "@/models/category";
import { useState } from "react";

interface CategoryProps {
    category: ICategory;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
    const [isVisible, setVisible] = useState<boolean>(false);

    return (
        <div
        className="w-48 h-48 border rounded-md flex flex-col justify-center items-center text-lg cursor-pointer relative overflow-hidden"
        style={{ borderColor: category.borderColor, backgroundColor: category.backgroundColor }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        >
            <h1 className="m-0 p-0">{ category.name }</h1>
            <p className={`text-slate-500 m-0 p-0 transition-opacity duration-300 ease-in-out translate-y-2 ${isVisible ? 'relative opacity-100 translate-y-0' : 'absolute opacity-0 translate-y-full'} w-full text-center`} style={{ top: '50%', transform: 'translateY(-50%)' }}>{ category.description }</p>
        </div>
    )
}

export default Category