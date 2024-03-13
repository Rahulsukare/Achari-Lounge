import { BiChevronRight , BiChevronDown} from "react-icons/bi";
import Dishes from "./Dishes";
import { useState } from "react";

const Menu = () => {

    const [handleCat, setHandleCat] = useState(false)

    const handleCategories = () => {
        setHandleCat(!handleCat);
    };

    return (
        <div className="flex flex-wrap md:flex-nowrap">

            {/* Left Categories Box */}
            <button className="md:hidden w-full mx-9 mt-10 px-6 py-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all rounded-full" onClick={handleCategories}>Categories {handleCat?(<BiChevronRight className="inline"size={25}/>):(<BiChevronDown className="inline"size={25}/>)}</button>
            

            <div className={`${handleCat && 'hidden'} mx-9 w-full md:w-1/4 ml-9 mt-9 border-slate-300 border p-9 md:block`}>
                <h1 className=" text-2xl mb-4">CATEGORIES</h1>
                <h3 className="inline"><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />All </h3><span className=" text-sm text-slate-500">(229)</span>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Achari Special Dishes</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Balti Dishes</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Beverages</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Bhuna Dishes</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Chefs Special</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Curry Special</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Dansak Dishes</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Beverages</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Balti Dishes</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Bhuna Dishes</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Chefs Special</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Curry Special</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Cocks</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Snacks</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Drinks</h3>
                <h3><BiChevronRight className="cursor-pointer inline text-red-600" size={25} />Shakes</h3>
            </div>

            {/* right box contains MENU-ITEM */}
            <div className="w-full mt-9 px-9">
                <div className="flex justify-between items-center flex-wrap">
                    <h2 className="text-neutral-600 my-1">  Showing all 7 results</h2>
                    <button className="text-neutral-500 p-2 my-1 border-2 border-slate-300 ">Default sorting <BiChevronDown className="cursor-pointer inline text-neutral-400 ml-1" size={25} /> </button>
                </div>
                <Dishes/>
            </div>
            {/* end right box */}

        </div>
    )
}

export default Menu
