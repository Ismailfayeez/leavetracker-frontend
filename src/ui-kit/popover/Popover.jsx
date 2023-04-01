import React, { useCallback, useEffect, useRef } from 'react';

function Popover({ children, targetElement, isOpen, setIsOpen }) {
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  const handleWheelEvent = useCallback((event) => {
    event.preventDefault();
  }, []);
  const handleClickOutside = useCallback(
    (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('wheel', handleWheelEvent, { passive: false });
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('wheel', handleWheelEvent, { passive: false });
    }
  }, [isOpen, handleClickOutside, handleWheelEvent]);

  useEffect(() => {
    if (isOpen) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      // Determine the best placement for the popover based on screen size
      let placement = 'bottom';
      if (triggerRect.top - popoverRect.height < 0) {
        placement = 'bottom';
      } else if (triggerRect.left + popoverRect.width > window.innerWidth) {
        placement = 'left';
      } else if (triggerRect.right - popoverRect.width < 0) {
        placement = 'right';
      } else {
        placement = 'top';
      }
      // Position the popover based on the placement
      switch (placement) {
        case 'bottom':
          popoverRef.current.style.top = `${triggerRect.bottom}px`;
          popoverRef.current.style.left = `${triggerRect.left}px`;
          break;
        case 'left':
          popoverRef.current.style.top = `${triggerRect.top}px`;
          popoverRef.current.style.left = `${triggerRect.left - popoverRect.width}px`;
          break;
        case 'right':
          popoverRef.current.style.top = `${triggerRect.top}px`;
          popoverRef.current.style.left = `${triggerRect.right}px`;
          break;
        case 'top':
          popoverRef.current.style.top = `${triggerRect.top - popoverRect.height}px`;
          popoverRef.current.style.left = `${triggerRect.left}px`;
          break;
        default:
          break;
      }
    }
  }, [isOpen]);

  return (
    <div ref={triggerRef}>
      <span onClick={() => setIsOpen(!isOpen)} role="presentation">
        {targetElement}
      </span>
      {isOpen && (
        <div ref={popoverRef} style={{ position: 'fixed', zIndex: '10000', overflow: 'hidden' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default Popover;
