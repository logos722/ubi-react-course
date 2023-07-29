import React from 'react';
import classes from './MyButton.module.css';
export const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} disabled={false} className={classes.myBtn}>
      {children}
    </button>
  );
};
