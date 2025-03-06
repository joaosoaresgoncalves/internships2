import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const internships = await db.internship.findMany({
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

