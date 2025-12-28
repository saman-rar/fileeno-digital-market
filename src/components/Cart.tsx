'use client';

import { ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { faPriceformatter } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import Image from 'next/image';

const Cart = () => {
  const itemCount = 0;

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingCart
          aria-hidden='true'
          className='h-6 w-6 shrink-0 text-gray-700 group-hover:text-gray-500'
        />
        <Badge className='flex items-center justify-center w-4 h-4 -ml-2 -mt-4'>
          <span className='text-sm font-medium text-gray-100 group-hover:text-gray-300 mt-1'>
            5
          </span>
        </Badge>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>سبد خرید (0)</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>
              {/* TODO:cart login */}
              محصولات
            </div>
            <div className='space-y-4 px-6'>
              <Separator />
              <div className='space-y-1.5 text-sm'>
                <div className='flex'>
                  <span className='flex-1'>ارسال</span>
                  <span>رایگان</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>مالیات</span>
                  <span>{faPriceformatter(10000)} تومان</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>مجوع</span>
                  <span>{faPriceformatter(10000)} تومان</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({
                      className: 'w-full',
                    })}
                  >
                    پرداخت
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className='flex h-[80%] flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Image src='/shopping.png' fill alt='سبد خرید خالی' />
            </div>
            <div className='text-xl font-semibold'>
              سبد خرید شما خالی میباشد!
            </div>
            <SheetTrigger asChild>
              <Link
                href='/products'
                className={buttonVariants({
                  variant: 'link',
                  className: 'text-sm text-muted-foreground!',
                  size: 'sm',
                })}
              >
                محصول مورد نظر خودتونو برای پرداخت به سبد خرید اضافه کنید.
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
