import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-87.5">
          <div className="flex flex-col items-center bg-amber-900 space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <Button>hello</Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default page
