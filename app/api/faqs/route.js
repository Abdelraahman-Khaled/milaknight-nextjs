import { NextResponse } from 'next/server';
import faqData from './data.json';

export async function GET() {
    return NextResponse.json(faqData);
}
