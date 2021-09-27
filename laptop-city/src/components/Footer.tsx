import './Footer.css';
import { FC } from 'react';

const Footer: FC<{}> = props => {
  return (
    <footer className="footer copyright">
      &copy; Copyright 2021, Example Corporation
    </footer>
  );
};

export { Footer };
