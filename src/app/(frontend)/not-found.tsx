import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>Page introuvable</h1>
        <p className="mb-4">La page que vous avez demandé n&apos;existe pas.</p>
      </div>

      <Button asChild variant="default">
        <Link href="/">Retournez à l&apos;accueil</Link>
      </Button>
    </div>
  )
}
