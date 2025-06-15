import Image from "next/image";

interface WebsiteCardProps {
    id: number;
    logo: string;
    name: string;
    category: string;
    description: string;
    url: string;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ id, logo, name, category, description, url }) => {
    const handleClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            key={id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 py-8 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 w-full max-w-sm mx-auto relative cursor-pointer"
            style={{ minWidth: '280px' }}
            onClick={handleClick}
        >
            <div className="flex items-center space-x-4 mt-2">
                <Image
                    src={logo}
                    alt={`${name} logo`}
                    width={32}
                    height={32}
                    className="rounded-lg object-cover shadow-sm w-8 h-8 sm:w-12 sm:h-12"
                    onError={(e) => {
                    // Fallback to initials if logo fails to load
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                        parent.innerHTML = `<span class="text-white font-bold text-sm sm:text-lg">${name.charAt(0)}</span>`;
                    }
                    }}
                />
                <div className="flex-1">
                    <h3 className="text-lg text-left font-semibold text-gray-900 dark:text-white">{name}</h3>
                    <p className="text-sm text-left text-gray-600 dark:text-gray-400">{category}</p>
                </div>
            </div>
            <p className="mt-4 mb-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-3 text-left">
                {description}
            </p>
        </div>
    )
}

export default WebsiteCard;