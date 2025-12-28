import Link from 'next/link';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Icons } from '../Icons';
import NavItems from './NavItems';
import { buttonVariants } from '../ui/button';
import Cart from '../Cart';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const user = null;

  return (
    <div dir='ltr' className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className=' flex h-16 items-center'>
              {/* TODO:mobile nav */}

              <div className='mr-4 flex lg:mr-0'>
                <Link
                  href='/'
                  className='inline-block transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] mr-4'
                >
                  <Icons.logo className='h-16 w-16 hover:drop-shadow-[0_5px_8px_rgba(155,109,255,0.5)]' />
                </Link>
              </div>
              <div className='hidden z-50 lg:mr-8 lg:block lg:self-stretch'>
                <NavItems />
              </div>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-3'>
                  {!user && (
                    <Link
                      className={buttonVariants({
                        variant: 'ghost',
                        className: 'text-lg!',
                      })}
                      href='/sign-in'
                    >
                      ورود
                    </Link>
                  )}

                  {!user && (
                    <span
                      className='h-7 bg-gray-400 w-0.5'
                      aria-hidden='true'
                    />
                  )}

                  {user ? (
                    <p></p>
                  ) : (
                    <Link
                      href='/sign-up'
                      className={buttonVariants({
                        variant: 'ghost',
                        className: 'text-lg!',
                      })}
                    >
                      ثبت نام
                    </Link>
                  )}

                  {user && (
                    <span
                      className='h-7 bg-gray-400 w-0.5'
                      aria-hidden='true'
                    />
                  )}

                  {!user && (
                    <div className='flex'>
                      <span
                        className='h-7 bg-gray-400 w-0.5'
                        aria-hidden='true'
                      />
                    </div>
                  )}

                  <div className='ml-4 flow-root lg:ml-6'>
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};
export default Navbar;
