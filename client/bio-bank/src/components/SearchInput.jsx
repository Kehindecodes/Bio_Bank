import { FaSearch } from "react-icons/fa";
const SearchInput = ({ onSearch, value }) => {
    return (
        <div className="relative w-96 search-input-component">
            <input
                className="form-input bg-transparent border rounded-full w-full py-3 px-3 text-surface-600 leading-tight focus:outline-none focus:border-primary-500 mt-4 mb-3"
                type="text"
                placeholder="Search"
                value={value}
                onChange={onSearch}
            />
            <div className="absolute inset-y-0 right-5 flex items-center pl-3 text-gray-500">
                <FaSearch />
            </div>
        </div>
    );
};
export default SearchInput