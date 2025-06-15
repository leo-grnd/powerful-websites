#!/usr/bin/env node

/**
 * Script d'initialisation de la base de données SQLite
 * Usage: node scripts/init-db.js [--reset]
 */

const path = require('path');
const fs = require('fs');

// Import dynamique pour éviter les problèmes avec ESM
async function main() {
  const { getDatabase, WebsiteService } = await import('../src/lib/database.ts');
  
  const shouldReset = process.argv.includes('--reset');
  
  if (shouldReset) {
    const dbPath = path.join(process.cwd(), 'websites.db');
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log('🗑️  Base de données supprimée');
    }
  }
  
  // Initialiser la base de données
  const db = getDatabase();
  console.log('✅ Base de données initialisée');
  
  // Vérifier le contenu
  const service = new WebsiteService();
  const websites = service.getAllWebsites();
  const categories = service.getCategories();
  
  console.log(`📊 Statistiques:`);
  console.log(`   - Sites web: ${websites.length}`);
  console.log(`   - Catégories: ${categories.length}`);
  console.log(`   - Catégories disponibles: ${categories.join(', ')}`);
  
  console.log('\n🎉 Base de données prête !');
  
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Erreur:', error);
  process.exit(1);
});
