'use client'

import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import { Loader2, LogOut } from 'lucide-react'
import { useState } from 'react'

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogoot = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: '/sign-in/?as=seller' })
    setIsLoading(false)
  }

  return (
    <Button variant="outline" onClick={handleLogoot}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
    </Button>
  )
}
export default Logout
