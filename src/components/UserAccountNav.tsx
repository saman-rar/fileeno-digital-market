'use client'

import { useAuth } from '@/hooks/use-auth'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { User } from '@/payload-types'
import Link from 'next/link'

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          حساب من
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 rounded-md">
        <div className="flex items-center justify-center gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/admin" className="flex justify-center">
            پنل فروش
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={signOut} className="cursor-pointer flex justify-center">
          خروج از حساب
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserAccountNav
