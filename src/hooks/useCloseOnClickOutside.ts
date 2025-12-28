import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent | KeyboardEvent;

const useCloseOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: any) => {
      event.preventDefault();
      const el = ref?.current;
      if (event.key !== 'Escape' && event.key !== 'Backspace') {
        return;
      }

      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
      document.removeEventListener('keydown', listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};

export default useCloseOnClickOutside;
