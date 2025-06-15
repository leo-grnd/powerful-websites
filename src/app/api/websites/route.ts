import { NextRequest, NextResponse } from 'next/server';
import { WebsiteService } from '@/lib/database';

const websiteService = new WebsiteService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All';

    let websites;
    if (search) {
      websites = websiteService.searchWebsites(search, category);
    } else {
      websites = websiteService.getWebsitesByCategory(category);
    }

    return NextResponse.json({ websites });
  } catch (error) {
    console.error('Error fetching websites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch websites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, logo, url } = body;

    if (!name || !description || !category || !logo || !url) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const website = websiteService.createWebsite({
      name,
      description,
      category,
      logo,
      url
    });

    return NextResponse.json({ website }, { status: 201 });
  } catch (error) {
    console.error('Error creating website:', error);
    return NextResponse.json(
      { error: 'Failed to create website' },
      { status: 500 }
    );
  }
}
