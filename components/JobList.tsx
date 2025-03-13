'use client'

import { useState, useEffect } from 'react'

// Define the Job type to match your database schema
interface Job {
  id: number
  title?: string
  company?: string
  location?: string
  job_url?: string
  date_loaded?: string
  // Add other fields as needed, but these are the ones used in the component
}

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
            <div className="mt-2">
              <a 
                href={job.job_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Job
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 