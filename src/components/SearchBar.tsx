import type { ChangeEvent } from 'react';

interface SearchBarProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="w-full flex justify-center mb-2">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl">
            <input
              type="text"
              placeholder="Search a website by name or description..."
              value={value}
              onChange={onChange}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 focus:outline-none shadow-lg transition-all duration-200"
            />
            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
    )
}

export default SearchBar