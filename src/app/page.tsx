"use client";

import { useState } from "react";
import Image from "next/image";
import WebsiteCard from "@/components/WebsiteCard";
import SearchBar from "@/components/SearchBar";
import CategoryButton from "@/components/CategoryButton";
import { useWebsites } from "@/hooks/useWebsites";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const { websites, categories, loading, error } = useWebsites(searchTerm, selectedCategory);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">

        {/* Main title */}
        <div className="w-full flex flex-col items-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pt-20 mb-4 text-center">
            Powerful Websites
          </h1>          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-center mt-0 px-4">
            Discover the best web tools to boost your productivity
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

        {/* Display websites */}
        <div className="w-full flex justify-center mb-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-6xl mb-4">⏳</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Chargement...
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Récupération des sites web
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Erreur
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {error}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-7xl">
              {websites.map((website, index) => (
                <WebsiteCard 
                  key={website.id}
                  id={website.id} 
                  logo={website.logo} 
                  name={website.name} 
                  category={website.category} 
                  description={website.description}
                  url={website.url}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Message if no result */}
        {websites.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No website found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try modifying your search or select another category
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
}
