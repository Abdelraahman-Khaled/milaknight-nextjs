import { NextResponse } from 'next/server';
import { blogs } from '../../../data/blogs';

export async function GET(request, { params }) {
    const { slug } = await params;

    // URL decode the slug to handle Arabic characters
    const decodedSlug = decodeURIComponent(slug);

    const blog = blogs.find(b => b.slug === decodedSlug);

    if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
}
