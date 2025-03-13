"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type Internship = {
  id: string
  companyName: string
  jobUrl: string
  jobType: string
  openingDate: Date
  closingDate: Date
}

export const columns: ColumnDef<Internship>[] = [
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "jobUrl",
    header: "Job URL",
    cell: ({ row }) => {
      const url = row.getValue("jobUrl") as string
      return (
        <Link href={url} target="_blank" className="flex items-center text-blue-600 hover:underline">
          View Job <ExternalLink className="ml-1 h-4 w-4" />
        </Link>
      )
    },
  },
  {
    accessorKey: "jobType",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "openingDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Opening Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("openingDate") as Date
      return <div>{new Date(date).toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "closingDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Closing Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("closingDate") as Date
      return <div>{new Date(date).toLocaleDateString()}</div>
    },
  },
]

