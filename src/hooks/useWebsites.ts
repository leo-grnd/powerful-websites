import { useState, useEffect } from 'react';
import { Website } from '@/lib/database';
import { useDebounce } from './useDebounce';

interface UseWebsitesReturn {
  websites: Website[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWebsites(searchTerm: string = '', selectedCategory: string = 'All'): UseWebsitesReturn {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Debounce le terme de recherche pour éviter trop de requêtes
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      setError(null);
        const params = new URLSearchParams();
      if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
      if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
      
      const response = await fetch(`/api/websites?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch websites');
      }
      
      const data = await response.json();
      setWebsites(data.websites);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching websites:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Keep default categories if fetch fails
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchWebsites();
  }, [debouncedSearchTerm, selectedCategory]);

  const refetch = () => {
    fetchWebsites();
  };

  return {
    websites,
    categories,
    loading,
    error,
    refetch
  };
}
