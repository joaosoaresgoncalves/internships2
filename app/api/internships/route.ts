import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        hidden: { not: 1 }  // Exclude hidden jobs
      },
      orderBy: {
        date_loaded: 'desc'
      }
    })
    
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}