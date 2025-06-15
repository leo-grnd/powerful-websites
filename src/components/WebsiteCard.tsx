import Image from "next/image";

interface WebsiteCardProps {
    id: number;
    logo: string;
    name: string;
    category: string;
    description: string;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ id, logo, name, category, description }) => {
    return (
        <div
            key={id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 w-full max-w-sm mx-auto relative"
            style={{ minWidth: '280px' }}
        >
            {/* Logo dans le coin supérieur gauche */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden relative">
                <Image
                    src={logo}
                    alt={`${name} logo`}
                    width={32}
                    height={32}
                    className="rounded-lg object-cover"
                    onError={(e) => {
                    // Masquer l'image et afficher l'icône de fallback
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                        parent.innerHTML = `<span class="text-white font-bold text-sm sm:text-lg">${name.charAt(0)}</span>`;
                    }
                    }}
                />
                </div>
            </div>                {/* Nom et catégorie alignés avec le haut du logo */}
            <div className="flex items-start mb-4" style={{ paddingTop: '0.5rem', paddingLeft: '4.5rem' }}>
                <div className="flex flex-col w-full">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-none mb-1 text-left" style={{ lineHeight: '1' }}>
                    {name}
                </h3>
                <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium text-left">
                    {category}
                </span>
                </div>
            </div>                {/* Description avec style uniforme */}
            <div className="flex justify-center">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base text-center max-w-xs">
                {description}
                </p>
            </div>
        </div>
    )
}

export default WebsiteCard;