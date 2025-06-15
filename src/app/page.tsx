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
      <div className="container mx-auto px-4 py-8">
        {/* Titre principal */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Powerful Websites
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez les meilleurs outils du web pour booster votre productivité
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un site par nom ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 focus:outline-none shadow-lg transition-all duration-200"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Boutons de catégories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredWebsites.map((website) => (
            <div
              key={website.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4 overflow-hidden relative">
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
                        parent.innerHTML = `<span class="text-white font-bold text-lg">${website.name.charAt(0)}</span>`;
                      }
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {website.name}
                  </h3>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {website.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {website.description}
              </p>
            </div>
          ))}
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
