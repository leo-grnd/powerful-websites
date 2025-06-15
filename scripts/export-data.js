#!/usr/bin/env node

/**
 * Script d'export/import de la base de données
 * Usage: 
 *   node scripts/export-data.js export > data.json
 *   node scripts/export-data.js import < data.json
 */

const fs = require('fs');

async function exportData() {
  const { WebsiteService } = await import('../src/lib/database.ts');
  const service = new WebsiteService();
  
  const websites = service.getAllWebsites();
  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    websites: websites.map(({ id, created_at, updated_at, ...website }) => website)
  };
  
  console.log(JSON.stringify(data, null, 2));
}

async function importData() {
  let input = '';
  
  // Lire depuis stdin
  process.stdin.setEncoding('utf8');
  
  for await (const chunk of process.stdin) {
    input += chunk;
  }
  
  if (!input.trim()) {
    console.error('❌ Aucune donnée à importer');
    process.exit(1);
  }
  
  try {
    const data = JSON.parse(input);
    
    if (!data.websites || !Array.isArray(data.websites)) {
      throw new Error('Format de données invalide');
    }
    
    const { WebsiteService } = await import('../src/lib/database.ts');
    const service = new WebsiteService();
    
    let imported = 0;
    let errors = 0;
    
    for (const website of data.websites) {
      try {
        service.createWebsite(website);
        imported++;
      } catch (error) {
        console.error(`⚠️  Erreur lors de l'import de "${website.name}":`, error.message);
        errors++;
      }
    }
    
    console.log(`\n✅ Import terminé:`);
    console.log(`   - Sites importés: ${imported}`);
    console.log(`   - Erreurs: ${errors}`);
    
  } catch (error) {
    console.error('❌ Erreur lors du parsing JSON:', error.message);
    process.exit(1);
  }
}

async function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'export':
      await exportData();
      break;
      
    case 'import':
      await importData();
      break;
      
    default:
      console.log(`Usage: node scripts/export-data.js [export|import]
      
Exemples:
  # Exporter vers un fichier
  node scripts/export-data.js export > backup.json
  
  # Importer depuis un fichier  
  node scripts/export-data.js import < backup.json
  
  # Ou avec un pipe
  cat backup.json | node scripts/export-data.js import`);
      process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Erreur:', error);
  process.exit(1);
});
