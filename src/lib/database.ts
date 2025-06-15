import Database from 'better-sqlite3';
import path from 'path';
import { promises as fs } from 'fs';

export interface Website {
  id: number;
  name: string;
  description: string;
  category: string;
  logo: string;
  url: string;
  created_at?: string;
  updated_at?: string;
}

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'websites.db');
    db = new Database(dbPath);
    
    // Enable WAL mode for better concurrent access
    db.pragma('journal_mode = WAL');
    
    initializeDatabase();
  }
  return db;
}

function initializeDatabase() {
  const db = getDatabase();
  
  // Create websites table
  db.exec(`
    CREATE TABLE IF NOT EXISTS websites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      logo TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create trigger for updated_at
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS update_websites_updated_at 
    AFTER UPDATE ON websites
    BEGIN
      UPDATE websites SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END
  `);

  // Insert initial data if table is empty
  const count = db.prepare('SELECT COUNT(*) as count FROM websites').get() as { count: number };
  
  if (count.count === 0) {
    insertInitialData();
  }
}

function insertInitialData() {
  const db = getDatabase();
  
  const initialWebsites = [
    {
      name: "Notion",
      description: "All-in-one workspace for notes, documents, databases and project management",
      category: "Productivity",
      logo: "https://logo.clearbit.com/notion.so",
      url: "https://www.notion.so"
    },
    {
      name: "ChatGPT",
      description: "Advanced conversational AI assistant to answer all your questions and needs",
      category: "AI",
      logo: "https://logo.clearbit.com/openai.com",
      url: "https://chat.openai.com"
    },
    {
      name: "Figma",
      description: "Professional collaborative design tool for creating modern user interfaces",
      category: "Design",
      logo: "https://logo.clearbit.com/figma.com",
      url: "https://www.figma.com"
    },
    {
      name: "Canva",
      description: "Online graphic design creator with templates and integrated professional tools",
      category: "Design",
      logo: "https://logo.clearbit.com/canva.com",
      url: "https://www.canva.com"
    },
    {
      name: "Slack",
      description: "Team communication platform with channels, direct messages and multiple integrations",
      category: "Productivity",
      logo: "https://logo.clearbit.com/slack.com",
      url: "https://slack.com"
    },
    {
      name: "Claude",
      description: "AI assistant specialized in document analysis and content writing",
      category: "AI",
      logo: "https://logo.clearbit.com/anthropic.com",
      url: "https://claude.ai"
    },
    {
      name: "Linear",
      description: "Modern project management tool with clean interface and advanced features",
      category: "Tools",
      logo: "https://logo.clearbit.com/linear.app",
      url: "https://linear.app"
    },
    {
      name: "Midjourney",
      description: "AI artistic image generator with exceptional styles and render quality",
      category: "AI",
      logo: "https://logo.clearbit.com/midjourney.com",
      url: "https://www.midjourney.com"
    },
    {
      name: "Framer",
      description: "Advanced prototyping and web development tool with smooth animations and interactions",
      category: "Design",
      logo: "https://logo.clearbit.com/framer.com",
      url: "https://www.framer.com"
    },
    {
      name: "ClickUp",
      description: "Complete project management solution with integrated AI and customizable features",
      category: "Productivity",
      logo: "https://logo.clearbit.com/clickup.com",
      url: "https://clickup.com"
    },
    {
      name: "Otter.ai",
      description: "Automatic transcription and intelligent meeting summary with conversation analysis",
      category: "AI",
      logo: "https://logo.clearbit.com/otter.ai",
      url: "https://otter.ai"
    },
    {
      name: "Grammarly",
      description: "Automatic writing correction and improvement through advanced artificial intelligence",
      category: "AI",
      logo: "https://logo.clearbit.com/grammarly.com",
      url: "https://www.grammarly.com"
    },
    {
      name: "Trello",
      description: "Visual project management in Kanban mode with collaborative cards and boards",
      category: "Productivity",
      logo: "https://logo.clearbit.com/trello.com",
      url: "https://trello.com"
    },
    {
      name: "Zapier",
      description: "Intelligent automation of repetitive tasks between different web applications and services",
      category: "Tools",
      logo: "https://logo.clearbit.com/zapier.com",
      url: "https://zapier.com"
    },
    {
      name: "Miro",
      description: "Online collaborative whiteboard for brainstorming, planning and teamwork",
      category: "Productivity",
      logo: "https://logo.clearbit.com/miro.com",
      url: "https://miro.com"
    },
    {
      name: "GitHub",
      description: "Version control platform for collaborative software development with Git",
      category: "Dev Tools",
      logo: "https://logo.clearbit.com/github.com",
      url: "https://github.com"
    },
    {
      name: "VS Code",
      description: "Lightweight but powerful source code editor with extensions and debugging",
      category: "Dev Tools",
      logo: "https://logo.clearbit.com/code.visualstudio.com",
      url: "https://code.visualstudio.com"
    },
    {
      name: "Cursor",
      description: "AI-powered code editor that helps you write code faster with intelligent suggestions",
      category: "Dev Tools",
      logo: "https://logo.clearbit.com/cursor.com",
      url: "https://cursor.com"
    },
    {
      name: "Vercel",
      description: "Frontend deployment platform optimized for modern web frameworks",
      category: "Dev Tools",
      logo: "https://logo.clearbit.com/vercel.com",
      url: "https://vercel.com"
    }
  ];

  const insertStmt = db.prepare(`
    INSERT INTO websites (name, description, category, logo, url)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((websites: any[]) => {
    for (const website of websites) {
      insertStmt.run(website.name, website.description, website.category, website.logo, website.url);
    }
  });

  insertMany(initialWebsites);
}

// Database operations
export class WebsiteService {
  private db: Database.Database;

  constructor() {
    this.db = getDatabase();
  }

  getAllWebsites(): Website[] {
    const stmt = this.db.prepare('SELECT * FROM websites ORDER BY name ASC');
    return stmt.all() as Website[];
  }

  getWebsitesByCategory(category: string): Website[] {
    if (category === 'All') {
      return this.getAllWebsites();
    }
    
    const stmt = this.db.prepare('SELECT * FROM websites WHERE category = ? ORDER BY name ASC');
    return stmt.all(category) as Website[];
  }

  searchWebsites(searchTerm: string, category?: string): Website[] {
    let query = `
      SELECT * FROM websites 
      WHERE (name LIKE ? OR description LIKE ?)
    `;
    const params = [`%${searchTerm}%`, `%${searchTerm}%`];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY name ASC';

    const stmt = this.db.prepare(query);
    return stmt.all(...params) as Website[];
  }

  getWebsiteById(id: number): Website | undefined {
    const stmt = this.db.prepare('SELECT * FROM websites WHERE id = ?');
    return stmt.get(id) as Website | undefined;
  }

  createWebsite(website: Omit<Website, 'id' | 'created_at' | 'updated_at'>): Website {
    const stmt = this.db.prepare(`
      INSERT INTO websites (name, description, category, logo, url)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(website.name, website.description, website.category, website.logo, website.url);
    
    return this.getWebsiteById(result.lastInsertRowid as number)!;
  }

  updateWebsite(id: number, website: Partial<Omit<Website, 'id' | 'created_at' | 'updated_at'>>): Website | undefined {
    const fields = [];
    const values = [];
    
    if (website.name !== undefined) {
      fields.push('name = ?');
      values.push(website.name);
    }
    if (website.description !== undefined) {
      fields.push('description = ?');
      values.push(website.description);
    }
    if (website.category !== undefined) {
      fields.push('category = ?');
      values.push(website.category);
    }
    if (website.logo !== undefined) {
      fields.push('logo = ?');
      values.push(website.logo);
    }
    if (website.url !== undefined) {
      fields.push('url = ?');
      values.push(website.url);
    }

    if (fields.length === 0) {
      return this.getWebsiteById(id);
    }

    values.push(id);
    
    const stmt = this.db.prepare(`
      UPDATE websites 
      SET ${fields.join(', ')}
      WHERE id = ?
    `);
    
    stmt.run(...values);
    return this.getWebsiteById(id);
  }

  deleteWebsite(id: number): boolean {
    const stmt = this.db.prepare('DELETE FROM websites WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  getCategories(): string[] {
    const stmt = this.db.prepare('SELECT DISTINCT category FROM websites ORDER BY category ASC');
    const results = stmt.all() as { category: string }[];
    return ['All', ...results.map(r => r.category)];
  }
}
