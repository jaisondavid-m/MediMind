import React from 'react'
import { FaSearch } from "react-icons/fa";

function SkeltonLoading() {
  return (
    <div className="space-y-4 p-4 border rounded shadow-sm bg-gray-50 dark:bg-gray-800">
        {/* Header with icon */}
        <div className="flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-200 font-medium">
            <FaSearch className="animate-shake" />
            <span>Analysing</span>
        </div>
    
        {/* Skeleton lines */}
        <div className="space-y-2 mt-2">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
        </div>
    </div>
  )
}

export default SkeltonLoading
