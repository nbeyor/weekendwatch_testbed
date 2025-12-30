'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  fullScreen?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  fullScreen = true,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-black p-3 flex items-center justify-between bg-white">
          {title && <h2 className="text-lg font-bold flex-1">{title}</h2>}
          <button
            onClick={onClose}
            className="tap-target hover:opacity-50 transition-opacity"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-white">{children}</div>
      </div>
    </div>
  );
}
