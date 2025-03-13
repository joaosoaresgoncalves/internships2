<<<<<<< HEAD
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
=======
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const internships = await prisma.internship.findMany({
      orderBy: {
        openingDate: "desc",
      },
    })

    return NextResponse.json(internships)
  } catch (error) {
    console.error("Error fetching internships:", error)
    return NextResponse.json({ error: "Failed to fetch internships" }, { status: 500 })
  }
}

>>>>>>> 4d9dc79f685bc679d42d36e884c28ebefd262263
