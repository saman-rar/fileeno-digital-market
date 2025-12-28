import { LucideProps } from 'lucide-react';

export const Icons = {
  logo: (props: LucideProps) => {
    return (
      <svg
        {...props}
        width='220'
        height='160'
        viewBox='0 0 220 160'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
      >
        <defs>
          <linearGradient id='folderGrad' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stopColor='#9B6DFF' />
            <stop offset='100%' stopColor='#6A38E0' />
          </linearGradient>
        </defs>
        <path
          d='
      M30 50
      Q30 35 45 35
      H80
      Q90 35 95 45
      H170
      Q185 45 185 60
      V115
      Q185 130 170 130
      H45
      Q30 130 30 115
      Z
    '
          fill='url(#folderGrad)'
        />

        <text
          x='107'
          y='95'
          textAnchor='middle'
          fontSize='32'
          fontWeight='700'
          fontFamily='Poppins, Arial, sans-serif'
          fill='#FFFFFF'
          letterSpacing='1'
        >
          fileeno
        </text>
      </svg>
    );
  },
};
