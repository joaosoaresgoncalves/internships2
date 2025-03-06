import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.internship.deleteMany()

  // Create seed data
  const internships = [
    {
      companyName: "Google",
      jobUrl: "https://careers.google.com/jobs/results/123",
      jobType: "Software Engineering",
      openingDate: new Date("2025-01-15"),
      closingDate: new Date("2025-03-15"),
    },
    {
      companyName: "Microsoft",
      jobUrl: "https://careers.microsoft.com/us/en/job/1234",
      jobType: "Data Science",
      openingDate: new Date("2025-01-10"),
      closingDate: new Date("2025-02-28"),
    },
    {
      companyName: "Amazon",
      jobUrl: "https://amazon.jobs/en/jobs/1234",
      jobType: "Product Management",
      openingDate: new Date("2025-02-01"),
      closingDate: new Date("2025-04-01"),
    },
    {
      companyName: "Meta",
      jobUrl: "https://www.metacareers.com/jobs/1234",
      jobType: "UX/UI Design",
      openingDate: new Date("2025-01-20"),
      closingDate: new Date("2025-03-20"),
    },
    {
      companyName: "Apple",
      jobUrl: "https://jobs.apple.com/en-us/details/1234",
      jobType: "iOS Development",
      openingDate: new Date("2025-02-15"),
      closingDate: new Date("2025-04-15"),
    },
    {
      companyName: "Netflix",
      jobUrl: "https://jobs.netflix.com/jobs/1234",
      jobType: "Content Engineering",
      openingDate: new Date("2025-01-05"),
      closingDate: new Date("2025-03-05"),
    },
    {
      companyName: "Spotify",
      jobUrl: "https://www.lifeatspotify.com/jobs/1234",
      jobType: "Audio Engineering",
      openingDate: new Date("2025-02-10"),
      closingDate: new Date("2025-04-10"),
    },
    {
      companyName: "Tesla",
      jobUrl: "https://www.tesla.com/careers/search/1234",
      jobType: "Mechanical Engineering",
      openingDate: new Date("2025-01-25"),
      closingDate: new Date("2025-03-25"),
    },
    {
      companyName: "IBM",
      jobUrl: "https://careers.ibm.com/job/1234",
      jobType: "Quantum Computing",
      openingDate: new Date("2025-02-05"),
      closingDate: new Date("2025-04-05"),
    },
    {
      companyName: "Adobe",
      jobUrl: "https://www.adobe.com/careers/opportunities/1234",
      jobType: "Creative Design",
      openingDate: new Date("2025-01-30"),
      closingDate: new Date("2025-03-30"),
    },
  ]

  for (const internship of internships) {
    await prisma.internship.create({
      data: internship,
    })
  }

  console.log("Seed data created successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

