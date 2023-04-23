import { useState } from "react";

import { fetchSuggestions, fetchCountryFromCoords } from "../services/geoApi";

import {ReactComponent as SearchIcon} from "../assets/search.svg";
import {ReactComponent as GpsIcon} from "../assets/gps.svg";

const SearchBar = (props) => {
    const [searchResults, setSearchResults] = useState("");
    const [countrySuggestions, setCountrySuggestions] = useState([]);

    const handleChange = async (event) => {
        event.preventDefault();
        setSearchResults(event.target.value);
        const input = event.target.value;
        const suggestions = await fetchSuggestions(input);
        setCountrySuggestions(suggestions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(searchResults);
        setSearchResults("");
        setCountrySuggestions([]);
    };

    const handleGeoSearch = (event) => {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const country = await fetchCountryFromCoords(latitude, longitude);
            setSearchResults(country);
            props.onSubmit(country);
        });
    };

    const handleCountrySuggestionClick = (country) => {
        setSearchResults(country);
        setCountrySuggestions([]);
        props.onSubmit(country);
    };

    return (
        <>
            <div className="flex flex-row justify-center w-full">
                <form
                    onSubmit={handleSubmit}
                    className="flex justify-between border-b border-black w-full relative"
                >
                    <input
                        onChange={handleChange}
                        className="placeholder-black font-light w-full bg-transparent focus:outline-none text-black"
                        name="location"
                        type="text"
                        placeholder="Type a city name here"
                        autoComplete="off"
                        value={searchResults}
                    />
                    <button onClick={handleSubmit} aria-label="search weather">
                        <SearchIcon fill="#000" width={20}/>
                    </button>
                </form>
                <button
                    onClick={(event) => {
                        handleGeoSearch(event);
                    }}
                    className="p-4 ml-5 bg-black blackspace-nowrap rounded-lg transition duration-200 ease-in-out hover:bg-gray-600"
                    aria-label="search by geolocation"
                >
                    <GpsIcon fill="#fff" width={20} height={20}/>
                </button>
                {countrySuggestions.length > 0 && (
                    <div
                        className="absolute bg-white border border-gray-300 top-12 z-50"
                        style={{ width: "100%" }}
                    >
                        {countrySuggestions.map((country) => (
                            <div
                                key={country}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleCountrySuggestionClick(country)}
                            >
                                {country}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {props.message && (
                <div className="text-center text-red-500 mt-3">
                    {props.message}
                </div>
            )}
        </>
    );
};

export default SearchBar;
