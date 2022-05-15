import React from 'react';
import styles from './dropdownlist.module.css';

interface IDropdownListProps {
  children: React.ReactNode;
}

export function DropdownList({children}: IDropdownListProps) {
  return (
    <div className={styles.listContainer}>
      <div className={'list'}>
        {children}
      </div>
    </div>
  );
}
