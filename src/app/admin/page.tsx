"use client";

import { useState } from "react";
import { Website } from "@/lib/database";
import { useWebsites } from "@/hooks/useWebsites";
import { useDebounce } from "@/hooks/useDebounce";
import WebsiteForm from "@/components/WebsiteForm";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import { normalizeLogoUrl } from "@/lib/utils";

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Utilise le debounce pour la recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { websites, categories, loading, error, refetch } = useWebsites(debouncedSearchTerm, selectedCategory);

  const handleCreateWebsite = async (data: Omit<Website, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create website');
      }

      setShowForm(false);
      refetch();
    } catch (error) {
      console.error('Error creating website:', error);
      alert('Erreur lors de la création du site web');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateWebsite = async (data: Omit<Website, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingWebsite) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/websites/${editingWebsite.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update website');
      }

      setEditingWebsite(null);
      refetch();
    } catch (error) {
      console.error('Error updating website:', error);
      alert('Erreur lors de la modification du site web');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWebsite = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce site web ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/websites/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete website');
      }

      refetch();
    } catch (error) {
      console.error('Error deleting website:', error);
      alert('Erreur lors de la suppression du site web');
    }
  };

  const handleFormSubmit = (data: Omit<Website, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingWebsite) {
      handleUpdateWebsite(data);
    } else {
      handleCreateWebsite(data);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingWebsite(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="flex justify-between items-center mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Website Administration
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Website
          </button>
        </div>

        {/* Search and filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Websites table */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-6xl mb-4">⏳</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Loading...
                </h3>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Error
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{error}</p>
              </div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-white dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {websites.map((website) => (
                  <tr key={website.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">                        <Image
                          src={normalizeLogoUrl(website.logo)}
                          alt={`${website.name} logo`}
                          width={32}
                          height={32}
                          className="rounded-lg object-cover shadow-sm w-8 h-8 sm:w-12 sm:h-12"
                          onError={(e) => {
                            // Fallback to initials if logo fails to load
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="text-white font-bold text-sm sm:text-lg">${website.name.charAt(0)}</span>`;
                            }
                          }}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {website.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <a href={website.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {website.url}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                        {website.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs truncate">
                      {website.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditingWebsite(website)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteWebsite(website.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {websites.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No websites found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try to modify your search or add a new website.
            </p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {(showForm || editingWebsite) && (
        <WebsiteForm
          website={editingWebsite || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
