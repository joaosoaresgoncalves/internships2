import { db } from "@/lib/db"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/columns"

export default async function Home() {
  const internships = await db.internship.findMany({
    orderBy: {
      openingDate: "desc",
    },
  })

  return (
    <main className="min-h-screen flex flex-col">
      {/* Banner Section */}
      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Internship</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            Browse through hundreds of internship opportunities from top companies. Start your career journey with the
            right internship that matches your skills and interests.
          </p>
        </div>
      </section>

      {/* Table Section */}
      <section className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold mb-6">Available Internships</h2>
          <DataTable columns={columns} data={internships} />
        </div>
      </section>
    </main>
  )
}

