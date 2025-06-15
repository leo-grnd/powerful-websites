"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import WebsiteCard from "@/components/WebsiteCard";
import SearchBar from "@/components/SearchBar";
import CategoryButton from "@/components/CategoryButton"

// Sample data for websites
const websites = [
  {
    id: 1,
    name: "Notion",
    description: "All-in-one workspace for notes, documents, databases and project management",
    category: "Productivity",
    logo: "https://logo.clearbit.com/notion.so"
  },
  {
    id: 2,
    name: "ChatGPT",
    description: "Advanced conversational AI assistant to answer all your questions and needs",
    category: "AI",
    logo: "https://logo.clearbit.com/openai.com"
  },
  {
    id: 3,
    name: "Figma",
    description: "Professional collaborative design tool for creating modern user interfaces",
    category: "Design",
    logo: "https://logo.clearbit.com/figma.com"
  },
  {
    id: 4,
    name: "Canva",
    description: "Online graphic design creator with templates and integrated professional tools",
    category: "Design",
    logo: "https://logo.clearbit.com/canva.com"
  },
  {
    id: 5,
    name: "Slack",
    description: "Team communication platform with channels, direct messages and multiple integrations",
    category: "Productivity",
    logo: "https://logo.clearbit.com/slack.com"
  },
  {
    id: 6,
    name: "Claude",
    description: "AI assistant specialized in document analysis and content writing",
    category: "AI",
    logo: "https://logo.clearbit.com/anthropic.com"
  },
  {
    id: 7,
    name: "Linear",
    description: "Modern project management tool with clean interface and advanced features",
    category: "Tools",
    logo: "https://logo.clearbit.com/linear.app"
  },
  {
    id: 8,
    name: "Midjourney",
    description: "AI artistic image generator with exceptional styles and render quality",
    category: "AI",
    logo: "https://logo.clearbit.com/midjourney.com"
  },
  {
    id: 9,
    name: "Framer",
    description: "Advanced prototyping and web development tool with smooth animations and interactions",
    category: "Design",
    logo: "https://logo.clearbit.com/framer.com"
  },
  {
    id: 10,
    name: "ClickUp",
    description: "Complete project management solution with integrated AI and customizable features",
    category: "Productivity",
    logo: "https://logo.clearbit.com/clickup.com"
  },
  {
    id: 11,
    name: "Otter.ai",
    description: "Automatic transcription and intelligent meeting summary with conversation analysis",
    category: "AI",
    logo: "https://logo.clearbit.com/otter.ai"
  },
  {
    id: 12,
    name: "Grammarly",
    description: "Automatic writing correction and improvement through advanced artificial intelligence",
    category: "AI",
    logo: "https://logo.clearbit.com/grammarly.com"
  },
  {
    id: 13,
    name: "Trello",
    description: "Visual project management in Kanban mode with collaborative cards and boards",
    category: "Productivity",
    logo: "https://logo.clearbit.com/trello.com"
  },
  {
    id: 14,
    name: "Zapier",
    description: "Intelligent automation of repetitive tasks between different web applications and services",
    category: "Tools",
    logo: "https://logo.clearbit.com/zapier.com"
  },
  {
    id: 15,
    name: "Miro",
    description: "Online collaborative whiteboard for brainstorming, planning and teamwork",
    category: "Productivity",
    logo: "https://logo.clearbit.com/miro.com"
  }
];

const categories = ["All", "Productivity", "AI", "Design", "Tools"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredWebsites = useMemo(() => {
    return websites.filter(website => {
      const matchesSearch = website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           website.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || website.category === selectedCategory;
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
        </div>        {/* Message if no result */}
        {filteredWebsites.length === 0 && (
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
