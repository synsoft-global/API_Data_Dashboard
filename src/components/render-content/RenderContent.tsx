'use client'

import React from 'react'
import { Loader2 } from 'lucide-react' // optional, shadcn icon
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RenderContentProps } from './RenderContent.type'

export default function RenderContent({ isLoading = false, isFetching = false, isError = false, error, children }: RenderContentProps) {
  // Loading UI
  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="animate-spin mr-2" />
      </div>
    )
  }

  // Error UI
  if (isError) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error?.message || 'Something went wrong while fetching data.'}</AlertDescription>
      </Alert>
    )
  }

  // Success → render children
  return <>{children}</>
}
