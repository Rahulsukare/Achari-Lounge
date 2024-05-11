import React, { useState, useEffect } from "react";
import Dishes from "./Dishes";
import { BiChevronRight, BiErrorCircle, BiCheckCircle, BiChevronUp, BiChevronDown, BiX, BiFilter, BiFilterAlt, BiReset, BiArrowBack } from "react-icons/bi";
import Loading from "./Loading";
import Slider from 'react-slider'
// import { get } from "react-scroll/modules/mixins/scroller";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Menu = () => {
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(true);
    const [back, setBack] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]); // All menu
    const [searchMenuItems, setSearchMenuItems] = useState([]);
    const [menuItemsByCategory, setMenuItemsByCategory] = useState([]); // Menu by category
    // const [totalCategories, setTotalCategories] = useState(0);
    const [totalMenuItems, setTotalMenuItems] = useState(0);
    const [totalSearchMenuItems, setTotalSearchMenuItems] = useState(-1);
    const [totalMenuItemsByCategory, setTotalMenuItemsByCategory] = useState(0);
    const [handleCat, setHandleCat] = useState(false);
    const minPrice = 200;
    const maxPrice = 700;
    const [values, setValues] = useState([minPrice, maxPrice]);

    const [checkedCategories, setCheckedCategories] = useState({});


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Default");

    const handleSortChange = async (value) => {

        setLoading(true);
        const sortItems = (items, sortFunction) => [...items].sort(sortFunction);

        const sortFunctions = {
            'default': (a, b) => a.name.localeCompare(b.name),
            'price_asc': (a, b) => a.price - b.price,
            'price_desc': (a, b) => b.price - a.price,
            'name_asc': (a, b) => a.name.localeCompare(b.name),
            'name_desc': (a, b) => b.name.localeCompare(a.name),
        };

        const sortedItems = sortItems(menuItems, sortFunctions[value]);
        const sortedSearchItems = sortItems(searchMenuItems, sortFunctions[value]);
        const sortedCategoryItems = sortItems(menuItemsByCategory, sortFunctions[value]);

        setMenuItems(sortedItems);
        setSearchMenuItems(sortedSearchItems);
        setMenuItemsByCategory(sortedCategoryItems);

        setDropdownOpen(false);
        setSelectedSort(value);

        setTimeout(() => {
            setLoading(false)
        }, 500);

        // try {
        //     const response = await fetch(`${process.env.REACT_APP_HOST_URL}/menu/sort?sortBy=${value}`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        //     const data = await response.json();

        //     setMenuItems(data.menus);
        //     setTotalMenuItems(data.totalMenuItems)
        //     setSelectedSort(value);
        //     setDropdownOpen(false);
        // } catch (error) {
        //     console.error('Error fetching sorted menu items:', error);
        // }
    };

    useEffect(() => {
        setLoading(true);
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_HOST_URL}/category/getAllCategories`);
                const data = await response.json();
                setCategories(data.categories);
                // setTotalCategories(data.totalCategories);
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
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchCategories();
        fetchAllMenuItems();

        Promise.all([fetchCategories(), fetchAllMenuItems()]).then(() => {
            // setLoading(false);
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }).catch(error => {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
            console.error('Error in promise all:', error);
        });

    }, []);

    useEffect(() => {
        const initialCheckedState = {};
        categories.forEach(category => {
            initialCheckedState[category._id] = false;
        });
        setCheckedCategories(initialCheckedState);
    }, [categories]);

    const handleCategories = () => {
        setHandleCat(!handleCat);
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setCheckedCategories({
            ...checkedCategories,
            [id]: checked
        });
    };

    const fetchAllMenuItems = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST_URL}/menu/getAllMenus`);
            const data = await response.json();
            setMenuItems(data);
            setTotalMenuItems(data.length);
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } catch (error) {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
            console.error('Error fetching all menu items:', error);
        }
    };

    const filter = async (e) => {
        e.preventDefault();
        setLoading(true);
        const selectedCategories = Object.keys(checkedCategories).filter(id => checkedCategories[id]).map(id => categories.find(cat => cat._id === id).name);

        // Get the selected price range
        const minPrice = values[0];
        const maxPrice = values[1];
        if (selectedCategories.length === 0) {
            toast.warning(`Please Select Categories`, {
                className: "font-bold text-sm text-red-600",
                theme: 'light',
            });
            setLoading(false);
            return
        }

        try {
            setLoading(true);
            setFlag(false);
            handleCategories()
            const response = await fetch(`${process.env.REACT_APP_HOST_URL}/menu/filterMenu`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categories: selectedCategories,
                    minPrice,
                    maxPrice
                }),
            });

            if (!response.ok) {
                setMenuItemsByCategory([]);
                setTotalMenuItemsByCategory(0);

                const errorMessage = await response.text();
                toast.error(errorMessage || 'No Items Found', {
                    className: "font-bold text-sm text-red-600",
                    theme: 'light',

                });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setLoading(false)
                return
                // throw new Error(errorMessage || 'Error fetching menu items by category');
            }

            const data = await response.json();
            setMenuItemsByCategory(data.menus);
            setTotalMenuItemsByCategory(data.totalMenuItems);

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setFlag(false)
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } catch (error) {

            toast.error(error || 'Error fetching menu items by category', {
                className: "font-bold text-sm text-red-600",

                theme: 'light',

            });
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setFlag(false)
            handleCategories()
            setLoading(false)
        }
    };

    const getAll = async () => {
        setLoading(true)
        setFlag(true);
        fetchAllMenuItems();
        setSearchMenuItems([])
        setTotalSearchMenuItems(-1)
        setBack(false)
        setSearchQuery("");
        window.scroll(0, 0);
        // handleCategories();
        setDropdownOpen(false);
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST_URL}/menu/search?keyword=${searchQuery}`);
            const data = await response.json();
            setSearchMenuItems(data);
            setTotalSearchMenuItems(data.length);
            setFlag(true);
            setBack(true)
            setCheckedCategories({});
            setValues([minPrice, maxPrice]);
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } catch (error) {
            console.error('Error searching menu items:', error);
            setCheckedCategories({});
            setValues([minPrice, maxPrice]);
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    };


    return (
        <>
            <ToastContainer position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* {loading ? (<Loading />) : ( */}
            {/* // ${handleCat && 'fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity'} */}
            <div className={` relative flex flex-wrap lg:flex-nowrap sm:px-10 sm:py-8 md:px-16 lg:px-20 xl:px-28 animate-fade-in min-h-screen`}>

                <form className={`${handleCat ? ' inset-0 bg-white min-h-full overflow-auto' : ' -inset-full lg:inset-0'} absolute top-0 z-50  lg:relative lg:block lg:mt-9 p-9 w-fit h-fit lg:w-5/12 border-slate-300 border border-r-2 lg:border-none transition-all ease-in-out duration-700  `}
                    onSubmit={(e) => filter(e)}>

                    {handleCat && <BiX className={` lg:hidden absolute top-5 right-5 cursor-pointer transition-all ease-in-out hover:scale-125 hover:border-zinc-600 hover:border`} onClick={handleCategories} />}

                    <h2 className="text-md mb-4 pl-2 py-0 font-semibold border-l border-l-[#00813D]">CATEGORIES</h2>
                    {categories.map(category => (
                        <div className="flex items-center gap-3" >
                            <div className="inline-flex items-center">
                                <div className="relative flex items-center rounded-full cursor-pointer" >
                                    <input type="checkbox"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#00813D] checked:bg-[#00813D] checked:before:bg-[#00813D] hover:before:opacity-10"
                                        id={category._id}
                                        checked={checkedCategories[category._id] || false}
                                        onChange={handleCheckboxChange}

                                    />
                                    <span
                                        className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                            stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <label htmlFor={category._id} className=" group text-[0.82rem] my-2 cursor-pointer font-medium text-gray-700 text-nowrap hover:text-[#D12525]" key={category._id} >
                                {category.name}
                                <span className="text-[0.82rem] text-slate-500 group-hover:text-[#D12525]"> ({category.totalItems})</span>
                            </label>
                        </div>
                    ))}
                    <hr className="my-10" />

                    {/* price filter  */}
                    <h2 className="text-md mb-6 pl-2 py-0 font-semibold border-l border-l-[#00813D]">Price Filter</h2>

                    <Slider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        value={values}
                        min={0}
                        max={1000}
                        step={10}
                        minDistance={100}
                        onChange={setValues} withTracks={true}
                    />
                    <div className="flex justify-between items-center gap-3 mt-4 text-sm text-nowrap">
                        <div className=" w-full px-4 py-2 rounded-md text-[0.75rem] font-semibold text-gray-700 text-nowrap border border-zinc-300">₹ {values[0]}</div>
                        <div className="text-sm font-medium text-gray-700 text-nowrap"> - </div>
                        <div className=" w-full px-4 py-2 rounded-md text-[0.75rem] font-semibold text-gray-700 text-nowrap border border-zinc-300">₹ {values[1]}</div>
                    </div>

                    <hr className="my-10" />

                    <button type="reset" className="w-full my-1 cursor-pointer font-semibold overflow-hidden relative z-100 border border-[#D12525] group px-8 py-2"
                        onClick={() => {
                            setCheckedCategories({});
                            setValues([minPrice, maxPrice]);
                            setSelectedSort('Default')
                            getAll();
                        }}
                    >
                        <span className="relative z-10 text-[#D12525] group-hover:text-white text-[0.7rem] md:text-sm duration-500">RESET <BiReset className="inline" /></span>
                        <span className="absolute w-full h-full bg-[#D12525] -left-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                        <span className="absolute w-full h-full bg-[#D12525] -right-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                    </button>
                    <button type="submit" className="w-full px-8 py-2 my-1 cursor-pointer font-semibold overflow-hidden relative z-100 bg-[#00813D] group " >
                        <span className="relative z-10 text-white  text-[0.7rem] md:text-sm duration-500">FILTER <BiFilterAlt className="inline" /></span>
                        <span className="absolute w-full h-full bg-[#D12525] -left-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                        <span className="absolute w-full h-full bg-[#D12525] -right-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                    </button>
                </form>

                <div className={` lg:hidden ${handleCat ? 'inset-0 opacity-75' : '-inset-full opacity-0'} absolute top-0 bg-black w-full h-full z-40 transition-opacity ease-in-out duration-700`} onClick={() => setHandleCat(false)}>
                </div>

                {/* Right Container */}
                <div className={`w-full lg:my-9 p-9 animate-fade-in`}>

                    {/* Heading */}
                    <div className="flex items-center gap-2 mb-10">
                        {/* Filter Button */}
                        <button type="button" className={`${back && 'hidden'} lg:hidden min-w-fit px-3 sm:px-4 md:px-5 py-3 cursor-pointer font-semibold overflow-hidden relative z-100 bg-[#00813D] group rounded-md`} onClick={handleCategories}>
                            <span className="relative z-10 text-white text-sm duration-500 flex items-center justify-center gap-1"> <BiFilter size={21} className="inline" />FILTER</span>
                            <span className="absolute w-full h-full bg-[#D12525] -left-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                            <span className="absolute w-full h-full bg-[#D12525] -right-52 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                        </button>
                        {/* SEARCH BUTTON */}
                        <form className="w-full" onSubmit={handleSearch}>
                            <div className="relative flex items-center border border-zinc-400 rounded-md">
                                {back && <button type="button" className="absolute w-fit inset-y-0 inset-x-2 ps-1 " onClick={getAll}><BiArrowBack /></button>}
                                <div className={` ${back && 'hidden'} absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none`}>
                                    <svg className="w-4 h-4 text-zinc-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full py-3 px-2 ps-10 text-sm text-gray-900 border-none outline-none rounded-lg" placeholder="Search Your Favourite Food..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} required />
                            </div>
                        </form>

                    </div>

                    {/* SHOWING RESULTS */}
                    <div className="flex justify-between items-center flex-wrap mb-10">
                        <h2 className="text-neutral-600 font-medium text-sm my-1 mr-10"> Showing  <strong className="text-[#00813D] mx-1">{flag ? (totalSearchMenuItems >= 0 ? totalSearchMenuItems : totalMenuItems) : (totalMenuItemsByCategory)}</strong>  Results Out Of Total {totalMenuItems} </h2>
                        <div className="relative">
                            <div className="text-sm font-medium text-gray-700 mr-2 cursor-pointer flex items-center justify-center gap-1" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                Sort By : <span className="font-semibold flex items-center">{selectedSort} {dropdownOpen ? (<BiChevronUp className="inline w-5 h-5" />) : (<BiChevronDown className="inline w-5 h-5" />)} </span>
                            </div>

                            <div className={`${!dropdownOpen && 'hidden'} tracking-tight block absolute top-full left-0 w-fit bg-white border border-gray-300 rounded-sm shadow-lg z-10 mt-1 transition-opacity transform ease-in-out duration-300`}>
                                <div
                                    className=" text-sm text-nowrap font-medium text-zinc-600 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortChange("default")}
                                >
                                    Default
                                </div>
                                <div
                                    className=" text-sm text-nowrap font-medium text-zinc-600 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortChange("price_asc")}
                                >
                                    Price - Low to High
                                </div>
                                <div
                                    className=" text-sm text-nowrap font-medium text-zinc-600 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortChange("price_desc")}
                                >
                                    Price - High to Low
                                </div>
                                <div
                                    className=" text-sm text-nowrap font-medium text-zinc-600 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortChange("name_asc")}
                                >
                                    Name - A to Z
                                </div>
                                <div
                                    className=" text-sm text-nowrap font-medium text-zinc-600 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortChange("name_desc")}
                                >
                                    Name - Z to A
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN ITEMS */}
                    {totalSearchMenuItems === -1 ? <Dishes loading={loading} Menu={flag ? (menuItems) : (menuItemsByCategory)} /> : <Dishes loading={loading} Menu={searchMenuItems} />}

                </div>
            </div>
            {/* // )} */}
        </>
    );
}

export default Menu;
