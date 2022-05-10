import React from 'react';
import './dropdownlist.css';

interface IDropdownListProps {
  children: React.ReactNode;
}

export function DropdownList({children}: IDropdownListProps) {
  return (
    <div className={'listContainer'}>
      <div className={'list'}>
        {children}
      </div>
    </div>
  );
}
