# Powerful-Websites

A curated collection of powerful and useful websites you should know, inspired by viral TikTok and social media trends. Discover hidden gems, productivity tools, and unique resources—all in one place.



## 🚀 Installation et utilisation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd powerful-websites

# Installer les dépendances
npm install

# Initialiser la base de données (optionnel - se fait automatiquement)
npm run init-db
```

### Développement
```bash
# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Interface d'administration
Accédez à [http://localhost:3000/admin](http://localhost:3000/admin) pour gérer les sites web :
- Ajouter de nouveaux sites
- Modifier les sites existants  
- Supprimer des sites
- Rechercher et filtrer

## 🗄️ Gestion de la base de données

### Scripts disponibles
```bash
# Initialiser la base de données
npm run init-db

# Réinitialiser la base de données (supprime et recrée)
npm run reset-db
```

### Structure de la base de données
La base de données SQLite (`websites.db`) contient une table `websites` avec les champs :
- `id` - Identifiant unique (auto-incrémenté)
- `name` - Nom du site web
- `description` - Description du site
- `category` - Catégorie (Productivity, AI, Design, Tools)
- `logo` - URL du logo
- `url` - URL du site web
- `created_at` - Date de création
- `updated_at` - Date de dernière modification

## 🌐 API Endpoints

### Sites web
- `GET /api/websites` - Liste tous les sites (avec filtres optionnels)
  - `?search=terme` - Recherche dans le nom et la description
  - `?category=categorie` - Filtre par catégorie
- `POST /api/websites` - Crée un nouveau site
- `GET /api/websites/[id]` - Récupère un site par ID
- `PUT /api/websites/[id]` - Modifie un site
- `DELETE /api/websites/[id]` - Supprime un site

### Catégories
- `GET /api/categories` - Liste toutes les catégories disponibles

## 🛠️ Technologies utilisées

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **SQLite** - Base de données légère
- **better-sqlite3** - Driver SQLite performant
- **Tailwind CSS** - Framework CSS utilitaire
- **React Hooks** - Gestion d'état moderne

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/
│   │   ├── websites/          # API pour les sites web
│   │   └── categories/        # API pour les catégories
│   ├── admin/                 # Interface d'administration
│   └── page.tsx              # Page principale
├── components/               # Composants React réutilisables
├── hooks/                   # Hooks personnalisés
└── lib/
    └── database.ts          # Configuration et services SQLite
```

## 🔧 Développement

### Ajouter une nouvelle catégorie
1. Modifier la liste des catégories dans `src/components/WebsiteForm.tsx`
2. La nouvelle catégorie apparaîtra automatiquement dans les filtres

### Personnaliser le schéma de base de données
Modifiez le fichier `src/lib/database.ts` pour ajuster la structure des tables ou ajouter de nouveaux champs.

## 📄 Licence

*This project is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)*
