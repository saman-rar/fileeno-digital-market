'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { RefObject, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import useCloseOnClickOutside from '@/hooks/useCloseOnClickOutside';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useCloseOnClickOutside(navRef as RefObject<HTMLDivElement>, () =>
    setActiveIndex(null)
  );

  return (
    <div ref={navRef} className='flex gap-4 h-full'>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpne = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const isOpen = i === activeIndex;

        return (
          <NavItem
            category={category}
            handleOpen={handleOpne}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            key={category.value}
          />
        );
      })}
    </div>
  );
};
export default NavItems;

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

export const NavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  isOpen,
}: NavItemProps) => {
  return (
    <div className='flex'>
      <div className='relative flex items-center'>
        <Button
          onClick={handleOpen}
          variant={isOpen ? 'secondary' : 'outline'}
          className='gap-1.5'
        >
          {category.label}
          <ChevronDown
            className={cn('h-4 w-4 transition-all text-muted-foreground', {
              '-rotate-180': isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn(
            'absolute inset-x-0 top-full text-sm text-muted-foreground',
            {
              'animate-in fade-in-10 slide-in-from-top-5': !isAnyOpen,
            }
          )}
        >
          <div
            className='absolute inset-0 top-1/2 bg-white shadow'
            aria-hidden='true'
          />

          <div className='relative bg-white'>
            <div className='mx-auto max-w-7xl px-8'>
              <div className='grid grid-cols-4 gap-x-8 gap-y-10 py-16'>
                <div className='col-span-4 col-start-1 grid grid-cols-3 gap-x-8'>
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className='group relative text-base sm:text-sm'
                    >
                      <div className='relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                        <Image
                          src={item.imageSrc}
                          alt='product category image'
                          fill
                          className='object-cover object-center'
                        />
                      </div>

                      <Link
                        href={item.href}
                        className='mt-6 block font-medium text-gray-900'
                      >
                        {item.name}
                      </Link>
                      <p className='mt-1' aria-hidden='true'>
                        سفارش دهید
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
