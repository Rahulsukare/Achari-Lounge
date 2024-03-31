import React, { useState, useEffect } from "react";
import Dishes from "./Dishes";
import { BiChevronRight, BiChevronDown,BiArrowBack  } from "react-icons/bi";
import Loading from "./Loading";

const Menu = () => {
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(true);
    const [back, setBack] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]); // All menu
    const [searchMenuItems, setSearchMenuItems] = useState([]);
    const [menuItemsByCategory, setMenuItemsByCategory] = useState([]); // Menu by category
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalMenuItems, setTotalMenuItems] = useState(0);
    const [totalSearchMenuItems, setTotalSearchMenuItems] = useState(-1);
    const [totalMenuItemsByCategory, setTotalMenuItemsByCategory] = useState(0);
    const [handleCat, setHandleCat] = useState(true);

    const handleCategories = () => {
        setHandleCat(!handleCat);
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_HOST_URL}/category/getAllCategories`);
                const data = await response.json();
                setCategories(data.categories);
                setTotalCategories(data.totalCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchAllMenuItems = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_HOST_URL}/menu/getAllMenus`);
                const data = await response.json();
                setMenuItems(data);
                setTotalMenuItems(data.length);
                console.log(data)
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchData();
        fetchAllMenuItems();

        Promise.all([fetchData(), fetchAllMenuItems()]).then(() => {
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            console.error('Error in promise all:', error);
        });

    }, []);

    const fetchAllMenuItems = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST_URL}/menu/getAllMenus`);
            const data = await response.json();
            setMenuItems(data);
            setTotalMenuItems(data.length);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error fetching all menu items:', error);
        }
    };

    const getMenuItemByCategory = async (categoryName) => {
        try {
            setLoading(true);
            setFlag(false);
            const response = await fetch(`${process.env.REACT_APP_HOST_URL}/menu/getMenu/${categoryName}`);
            const data = await response.json();
            setMenuItemsByCategory(data.menus);
            setTotalMenuItemsByCategory(data.totalMenuItems);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching menu items by category:', error);
        }
    };

    const getAll = async () => {
        setFlag(true);
        fetchAllMenuItems();
        setSearchMenuItems([])
        setTotalSearchMenuItems(-1)
        setBack(false)
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST_URL}/menu/search?keyword=${searchQuery}`);
            const data = await response.json();
            setSearchMenuItems(data);
            setTotalSearchMenuItems(data.length);
            setFlag(true); // Show all results
            setLoading(false);
            setBack(true)
        } catch (error) {
            setLoading(false);
            console.error('Error searching menu items:', error);
        }
    };

    return (
        <>
            {loading ? (<Loading />) : (

                <div className="flex flex-wrap md:flex-nowrap pt-9 bg-[#f4f1ea] animate-fade-in">
                    <button className="md:hidden w-full mx-9 mt-5 px-6 py-3 bg-green-600 text-white hover:bg-green-600 transition-all rounded-md" onClick={handleCategories}>Categories {handleCat ? (<BiChevronRight className="inline" size={25} />) : (<BiChevronDown className="inline" size={25} />)}</button>
                    <div className={`${handleCat && 'hidden'} mx-9 w-full md:w-fit ml-9 mt-9 md:border-none border-slate-300 border p-9 md:block animate-fade-in`}>
                        <h2 className="text-xl mb-4 pl-2 py-0 font-semibold border-l border-l-green-600">CATEGORIES</h2>
                        <h3 className="text-sm my-3 inline cursor-pointer font-medium text-gray-700 text-nowrap hover:text-red-600" onClick={getAll}>
                            All
                            <span className="text-sm">({totalMenuItems})</span>
                        </h3>
                        {categories.map(category => (
                            <h3 className="text-sm my-3 cursor-pointer font-medium text-gray-700 text-nowrap hover:text-red-600" key={category._id} onClick={() => getMenuItemByCategory(category.name)}>
                                {category.name}
                                <span className="text-sm text-slate-500"> ({category.totalItems})</span>
                            </h3>
                        ))}
                    </div>

                    <div className="w-full my-10 md:mt-9 md:mx-12 px-9 py-9 bg-white animate-fade-in">
                        {/* SEARCH BUTTON */}
                        <form className="mx-auto mb-10" onSubmit={handleSearch}>
                            <div className="relative flex items-center border border-zinc-400 rounded-lg">
                                {back && <button className="p-3 ml-2 text-zinc-800" onClick={getAll}><BiArrowBack size={20}/></button>}
                                <div className={` ${back && 'hidden'} absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none`}>
                                    <svg className="w-4 h-4 text-zinc-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border-none outline-none" placeholder="Search Your Favourite Food..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} required />
                                <button type="submit" className="uppercase font-semibold w-fit mr-3 my-2 py-3 px-5 text-sm bg-green-600 text-white hover:bg-red-600 rounded-lg">Search</button>
                            </div>
                        </form>

                        {/* SHOWING RESULTS */}
                        <div className="flex justify-between items-center flex-wrap">
                            <h2 className="text-neutral-600 my-1">" Showing all <strong>{flag ? (totalSearchMenuItems >= 0 ? totalSearchMenuItems : totalMenuItems) : (totalMenuItemsByCategory)}</strong> results "</h2>
                            <button className="text-neutral-500 p-2 my-1 border-2 border-slate-300">Default sorting <BiChevronDown className="cursor-pointer inline text-neutral-400 ml-1" size={25} /></button>
                        </div>

                        {/* MAIN ITEMS */}
                        {totalSearchMenuItems === -1 ? <Dishes Menu={flag ? (menuItems) : (menuItemsByCategory)} /> : <Dishes Menu={searchMenuItems} />}
                    </div>
                </div>
            )}
        </>
    );
}

export default Menu;
