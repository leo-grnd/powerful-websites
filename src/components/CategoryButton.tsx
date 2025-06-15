interface CategoryButtonProps {
    category: string;
    isSelected: boolean;
    onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, isSelected, onClick }) => {
    return (
        <button
            key={category}
            onClick={onClick}
            style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '0.4rem', paddingBottom: '0.4rem' }}
            className={`rounded-full font-medium transition-all duration-200 text-sm sm:text-base ${
            isSelected
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md"
            }`}
        >
            {category}
        </button>
    )
}

export default CategoryButton