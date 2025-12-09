'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, Search } from 'lucide-react'

import { SearchInputProps } from './SearchInput.type'

export default function SearchInput({ value, onChange, placeholder = 'Search...', id = 'search-input', className = '', showClearButton = true }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Label htmlFor={id} className="sr-only">
        Search
      </Label>

      {/* Search Icon */}
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />

      <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pl-9 pr-9" />

      {/* Clear button */}
      {showClearButton && value.length > 0 ? (
        <button type="button" aria-label="Clear search" onClick={() => onChange('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
          <X size={16} />
        </button>
      ) : null}
    </div>
  )
}
