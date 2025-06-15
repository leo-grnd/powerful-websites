/**
 * Normalise une URL de logo pour s'assurer qu'elle est correctement formatée
 * @param logoUrl - L'URL du logo (peut être relative ou absolue)
 * @returns L'URL normalisée
 */
export function normalizeLogoUrl(logoUrl: string): string {
  // Si c'est déjà une URL complète (commence par http/https), on la retourne telle quelle
  if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
    return logoUrl;
  }
  
  // Si c'est un chemin qui commence par 'logos/' sans '/', on ajoute le '/'
  if (logoUrl.startsWith('logos/')) {
    return `/${logoUrl}`;
  }
  
  // Si c'est déjà un chemin qui commence par '/', on le retourne tel quel
  if (logoUrl.startsWith('/')) {
    return logoUrl;
  }
  
  // Dans tous les autres cas, on assume que c'est un chemin relatif et on ajoute '/'
  return `/${logoUrl}`;
}
