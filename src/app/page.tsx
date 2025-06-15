"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import WebsiteCard from "@/components/WebsiteCard";
import SearchBar from "@/components/SearchBar";
import CategoryButton from "@/components/CategoryButton"

// Données d'exemple pour les sites
const websites = [
  {
    id: 1,
    name: "Notion",
    description: "Espace de travail tout-en-un pour notes, documents, bases de données et gestion de projets",
    category: "Productivité",
    logo: "https://logo.clearbit.com/notion.so"
  },
  {
    id: 2,
    name: "ChatGPT",
    description: "Assistant IA conversationnel avancé pour répondre à toutes vos questions et besoins",
    category: "IA",
    logo: "https://logo.clearbit.com/openai.com"
  },
  {
    id: 3,
    name: "Figma",
    description: "Outil de conception collaborative professionnel pour créer des interfaces utilisateur modernes",
    category: "Design",
    logo: "https://logo.clearbit.com/figma.com"
  },
  {
    id: 4,
    name: "Canva",
    description: "Créateur de designs graphiques en ligne avec templates et outils professionnels intégrés",
    category: "Design",
    logo: "https://logo.clearbit.com/canva.com"
  },
  {
    id: 5,
    name: "Slack",
    description: "Plateforme de communication d'équipe avec channels, messages directs et intégrations multiples",
    category: "Productivité",
    logo: "https://logo.clearbit.com/slack.com"
  },
  {
    id: 6,
    name: "Claude",
    description: "Assistant IA spécialisé dans l'analyse de documents et la rédaction de contenu",
    category: "IA",
    logo: "https://logo.clearbit.com/anthropic.com"
  },
  {
    id: 7,
    name: "Linear",
    description: "Outil de gestion de projet moderne avec interface épurée et fonctionnalités avancées",
    category: "Outils",
    logo: "https://logo.clearbit.com/linear.app"
  },
  {
    id: 8,
    name: "Midjourney",
    description: "Générateur d'images artistiques par IA avec styles et qualité de rendu exceptionnels",
    category: "IA",
    logo: "https://logo.clearbit.com/midjourney.com"
  },
  {
    id: 9,
    name: "Framer",
    description: "Outil de prototypage avancé et développement web avec animations et interactions fluides",
    category: "Design",
    logo: "https://logo.clearbit.com/framer.com"
  },
  {
    id: 10,
    name: "ClickUp",
    description: "Solution complète de gestion de projet avec IA intégrée et fonctionnalités personnalisables",
    category: "Productivité",
    logo: "https://logo.clearbit.com/clickup.com"
  },
  {
    id: 11,
    name: "Otter.ai",
    description: "Transcription automatique et résumé intelligent de réunions avec analyse des conversations",
    category: "IA",
    logo: "https://logo.clearbit.com/otter.ai"
  },
  {
    id: 12,
    name: "Grammarly",
    description: "Correction et amélioration automatique de l'écriture grâce à l'intelligence artificielle avancée",
    category: "IA",
    logo: "https://logo.clearbit.com/grammarly.com"
  },
  {
    id: 13,
    name: "Trello",
    description: "Gestion visuelle de projets en mode Kanban avec cartes et tableaux collaboratifs",
    category: "Productivité",
    logo: "https://logo.clearbit.com/trello.com"
  },
  {
    id: 14,
    name: "Zapier",
    description: "Automatisation intelligente de tâches répétitives entre différentes applications web et services",
    category: "Outils",
    logo: "https://logo.clearbit.com/zapier.com"
  },
  {
    id: 15,
    name: "Miro",
    description: "Tableau blanc collaboratif en ligne pour brainstorming, planification et travail d'équipe",
    category: "Productivité",
    logo: "https://logo.clearbit.com/miro.com"
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
        
        {/* Main title */}
        <div className="w-full flex flex-col items-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pt-20 mb-4 text-center">
            Powerful Websites
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-center mt-0 px-4">
            Découvrez les meilleurs outils du web pour booster votre productivité
          </p>
        </div>

        {/* Search Bar */}  
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        
        {/* Buttons by category */}
        <div className="w-full flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 mb-12 px-2" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category} 
              isSelected={selectedCategory === category} 
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
        
        {/* Affichage des sites */}
        <div className="w-full flex justify-center mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-7xl">
            {filteredWebsites.map((website, index) => (
              <WebsiteCard 
                key={index}
                id={website.id} 
                logo={website.logo} 
                name={website.name} 
                category={website.category} 
                description={website.description}                
              />
          ))}
          </div>
        </div>

        {/* Message if no result */}
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
