import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ListItemProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  showChevron?: boolean;
  className?: string;
}

export function ListItem({
  href,
  onClick,
  children,
  showChevron = true,
  className = '',
}: ListItemProps) {
  const content = (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1">{children}</div>
      {showChevron && <ChevronRight className="w-4 h-4 flex-shrink-0 ml-2" />}
    </div>
  );

  const baseClassName = `list-item ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseClassName} w-full text-left`}>
        {content}
      </button>
    );
  }

  return <div className={baseClassName}>{content}</div>;
}
