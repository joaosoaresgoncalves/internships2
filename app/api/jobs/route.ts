import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        // You can customize this filter as needed
        hidden: { not: 1 } 
      },
      orderBy: {
        date_loaded: 'desc'
      },
      // Optional: limit the number of results
      // take: 100,
    })
    
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}