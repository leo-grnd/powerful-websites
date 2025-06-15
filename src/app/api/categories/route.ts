import { NextResponse } from 'next/server';
import { WebsiteService } from '@/lib/database';

const websiteService = new WebsiteService();

export async function GET() {
  try {
    const categories = websiteService.getCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
