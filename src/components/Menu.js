import { useState, useEffect } from "react";
import Dishes from "./Dishes";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import axios from "axios";
import Loading from "./Loading";

const Menu = () => {

    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(true);

    const [categories, setCategories] = useState([]);

    const [menuItems, setMenuItems] = useState([]);//All menu
    const [menuItemsByCategory, setMenuItemsByCategory] = useState([]);//Menu by category

    const [totalCategories, setTotalCategories] = useState(0);
    const [totalMenuItems, setTotalMenuItems] = useState(0);
    const [totalMenuItemsByCategory, setTotalMenuItemsByCategory] = useState(0);

    const [handleCat, setHandleCat] = useState(true)
    const handleCategories = () => {
        setHandleCat(!handleCat);
    };

    //For getting all categories with will mount on sidebar of category
    useEffect(() => {

        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8001/category/getAllCategories');
                const data = await response.json();

                // Update state with fetched data
                setCategories(data.categories);
                console.log(data.categories);
                setTotalCategories(data.totalCategories);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchAllMenuItems = async () => {
            try {
                const response = await fetch('http://localhost:8001/menu/getAllMenus');
                const data = await response.json();

                // Update state with fetched data
                setMenuItems(data);
                setTotalMenuItems(data.length)
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        fetchAllMenuItems();

        // Move setLoading to false after both fetch requests are completed
        Promise.all([fetchData(), fetchAllMenuItems()]).then(() => {
            setLoading(false);
        }).catch(error => {
            setLoading(false); // Ensure loading state is set to false even if there's an error
        });

    }, []);

    const getMenuItemByCategory = async (categoryName) => {
        try {
            setLoading(true);
            setFlag(false);
            const response = await fetch(`http://localhost:8001/menu/getMenu/${categoryName}`);
            const data = await response.json();

            // Update state with fetched data
            setMenuItemsByCategory(data.menus);
            setTotalMenuItemsByCategory(data.totalMenuItems);
            console.log(data.categories);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };


    return (
        <>
            {loading ? (<><Loading /></>) : (

                <div className="flex flex-wrap md:flex-nowrap pt-9 animate-fade-in">

                    {/* Left Categories Box */}
                    <button className="md:hidden w-full mx-9 mt-10 px-6 py-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all rounded-full" onClick={handleCategories}>Categories {handleCat ? (<BiChevronRight className="inline" size={25} />) : (<BiChevronDown className="inline" size={25} />)}</button>

                    {/* Sidebar */}
                    <div className={`${handleCat && 'hidden'} mx-9 w-full md:w-1/5 lg:w-1/4 ml-9 mt-9 border-slate-300 border p-9 md:block animate-fade-in`}>
                        <h1 className=" text-2xl mb-4">CATEGORIES</h1>
                        <h3 className="inline cursor-pointer" onClick={()=>{setFlag(true)}}>
                            <BiChevronRight className="cursor-pointer inline text-red-600" size={25} />All
                            <span className=" text-sm text-slate-500">({totalCategories})</span>
                        </h3>

                        {categories.map(category => (
                            <h3 className=" cursor-pointer" key={category._id} onClick={() => getMenuItemByCategory(category.name)}>
                                <BiChevronRight className="cursor-pointer inline text-red-600" size={25} />
                                {category.name}<span className=" text-sm text-slate-500"> ({category.totalItems})</span>
                            </h3>
                        ))}
                    </div>

                    {/* right box contains MENU-ITEM */}
                    <div className="w-full mt-9 px-9 animate-fade-in">
                        {/* Heading */}
                        <div className="flex justify-between items-center flex-wrap">
                            <h2 className="text-neutral-600 my-1">  " Showing all <strong>{flag ? (totalMenuItems) : (totalMenuItemsByCategory)}</strong> results "</h2>
                            <button className="text-neutral-500 p-2 my-1 border-2 border-slate-300 ">Default sorting <BiChevronDown className="cursor-pointer inline text-neutral-400 ml-1" size={25} /> </button>
                        </div>
                        {/* Menu items */}
                        <Dishes Menu={flag ? (menuItems) : (menuItemsByCategory)} />
                    </div>
                    {/* end right box */}

                </div>
            )}
        </>
    )
}

export default Menu
