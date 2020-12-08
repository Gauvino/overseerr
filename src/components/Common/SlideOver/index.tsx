/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Transition from '../../Transition';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import useClickOutside from '../../../hooks/useClickOutside';

interface SlideOverProps {
  show?: boolean;
  title: string;
  subText?: string;
  onClose: () => void;
}

const SlideOver: React.FC<SlideOverProps> = ({
  show = false,
  title,
  subText,
  onClose,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const slideoverRef = useRef(null);
  useLockBodyScroll(show);
  useClickOutside(slideoverRef, () => {
    onClose();
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <Transition
      show={show}
      appear
      enter="opacity-0 transition ease-in-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="opacity-100 transition ease-in-out duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`z-50 fixed inset-0 overflow-hidden bg-opacity-50 bg-gray-800`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition
              show={show}
              appear
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md" ref={slideoverRef}>
                <div className="h-full flex flex-col bg-gray-700 shadow-xl overflow-y-scroll">
                  <header className="space-y-1 py-6 px-4 bg-indigo-600 sm:px-6">
                    <div className="flex items-center justify-between space-x-3">
                      <h2 className="text-lg leading-7 font-medium text-white">
                        {title}
                      </h2>
                      <div className="h-7 flex items-center">
                        <button
                          aria-label="Close panel"
                          className="text-indigo-200 hover:text-white transition ease-in-out duration-150"
                          onClick={() => onClose()}
                        >
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {subText && (
                      <div>
                        <p className="text-sm leading-5 text-indigo-300">
                          {subText}
                        </p>
                      </div>
                    )}
                  </header>
                  <div className="relative flex-1 py-6 px-4 sm:px-6 text-white">
                    {children}
                  </div>
                </div>
              </div>
            </Transition>
          </section>
        </div>
      </div>
    </Transition>,
    document.body
  );
};

export default SlideOver;