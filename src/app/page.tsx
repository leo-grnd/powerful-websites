"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

// Données d'exemple pour les sites
const websites = [
  {
    id: 1,
    name: "Notion",
    description: "Espace de travail tout-en-un pour notes, docs et projets",
    category: "Productivité",
    logo: "https://logo.clearbit.com/notion.so"
  },
  {
    id: 2,
    name: "ChatGPT",
    description: "Assistant IA conversationnel pour répondre à vos questions",
    category: "IA",
    logo: "https://logo.clearbit.com/openai.com"
  },
  {
    id: 3,
    name: "Figma",
    description: "Outil de conception collaborative pour interfaces",
    category: "Design",
    logo: "https://logo.clearbit.com/figma.com"
  },
  {
    id: 4,
    name: "Canva",
    description: "Créateur de designs graphiques en ligne",
    category: "Design",
    logo: "https://logo.clearbit.com/canva.com"
  },
  {
    id: 5,
    name: "Slack",
    description: "Plateforme de communication d'équipe",
    category: "Productivité",
    logo: "https://logo.clearbit.com/slack.com"
  },
  {
    id: 6,
    name: "Claude",
    description: "Assistant IA pour l'analyse et la rédaction",
    category: "IA",
    logo: "https://logo.clearbit.com/anthropic.com"
  },
  {
    id: 7,
    name: "Linear",
    description: "Outil de gestion de projet moderne",
    category: "Outils",
    logo: "https://logo.clearbit.com/linear.app"
  },
  {
    id: 8,
    name: "Midjourney",
    description: "Générateur d'images par IA",
    category: "IA",
    logo: "https://logo.clearbit.com/midjourney.com"
  },
  {
    id: 9,
    name: "Framer",
    description: "Outil de prototypage et développement web",
    category: "Design",
    logo: "https://logo.clearbit.com/framer.com"
  }
];

const categories = ["Tous", "Productivité", "IA", "Design", "Outils"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredWebsites = useMemo(() => {
    return websites.filter(website => {
      const matchesSearch = website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           website.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Tous" || website.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        {/* Titre principal */}
        <div className="w-full flex flex-col items-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 text-center">
            Powerful Websites
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-center mt-0 px-4">
            Découvrez les meilleurs outils du web pour booster votre productivité
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="w-full flex justify-center mb-8">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl">
            <input
              type="text"
              placeholder="Rechercher un site par nom ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 sm:px-6 py-5 sm:py-6 text-base sm:text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 focus:outline-none shadow-lg transition-all duration-200"
            />
            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>        {/* Boutons de catégories */}
        <div className="w-full flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 mb-12 px-2" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '0.4rem', paddingBottom: '0.4rem' }}
              className={`rounded-full font-medium transition-all duration-200 text-sm sm:text-base ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Affichage des sites */}
        <div className="w-full flex justify-center mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-xs sm:max-w-sm md:max-w-4xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-7xl">
            {filteredWebsites.map((website) => (
              <div
                key={website.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 w-full max-w-sm mx-auto relative"
              >
                {/* Logo dans le coin supérieur gauche */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={website.logo}
                      alt={`${website.name} logo`}
                      width={32}
                      height={32}
                      className="rounded-lg object-cover"
                      onError={(e) => {
                        // Masquer l'image et afficher l'icône de fallback
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-white font-bold text-sm sm:text-lg">${website.name.charAt(0)}</span>`;
                        }
                      }}
                    />
                  </div>
                </div>                {/* Nom et catégorie alignés avec le haut du logo */}
                <div className="flex items-start mb-4" style={{ paddingTop: '0.5rem', paddingLeft: '4.5rem' }}>
                  <div className="flex flex-col w-full">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-none mb-1 text-left" style={{ lineHeight: '1' }}>
                      {website.name}
                    </h3>
                    <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium text-left">
                      {website.category}
                    </span>
                  </div>
                </div>                {/* Description centrée horizontalement */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base text-center">
                  {website.description}
                </p>
              </div>
          ))}
          </div>
        </div>

        {/* Message si aucun résultat */}
        {filteredWebsites.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Aucun site trouvé
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Essayez de modifier votre recherche ou sélectionnez une autre catégorie
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
