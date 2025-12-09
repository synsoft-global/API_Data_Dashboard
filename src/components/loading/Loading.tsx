import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingProps } from './Loading.type'

export const LoadingSkeleton: React.FC<LoadingProps> = ({ lines = 3, showSpinner = true, className = '' }) => {
  const items = Array.from({ length: Math.max(1, lines) })

  return (
    <Card className={`max-w-xl mx-auto ${className}`}>
      <CardContent className="p-6 flex gap-4 items-start">
        {showSpinner && (
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>
          </div>
        )}

        <div className="flex-1 w-full space-y-3">
          {items.map((_, i) => (
            <div key={i} className="w-full">
              <div className="h-3 rounded-md bg-muted-foreground/10 w-3/4 animate-pulse" />
              <div className="h-2 rounded-md bg-muted-foreground/8 w-1/2 mt-2 animate-pulse" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
