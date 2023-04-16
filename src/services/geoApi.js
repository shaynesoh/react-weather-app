import { countryCodes } from "../data/countryCodes";

export const fetchSuggestions = async (searchTerm) => {
    if (searchTerm.length > 0) {
        try {
            const matchingCodes = countryCodes.filter((code) => {
                const country = `${code.name}, ${code.country}`;
                return country.toLowerCase().includes(searchTerm.toLowerCase());
            });
            const suggestions = matchingCodes.map(
                (result) => `${result.name}, ${result.country}`
            );
            return suggestions.slice(0, 5);
        } catch (error) {
            console.error(error);
            return [];
        }
    } else {
        return [];
    }
};

export const fetchCountryFromCoords = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const country = data.address.country;
        return country;
    } catch (error) {
        console.error(error);
        return "";
    }
};