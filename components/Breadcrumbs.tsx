
// Design by suritargets

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Props {
  currentPage: string;
}

const Breadcrumbs: React.FC<Props> = ({ currentPage }) => {
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-black text-gray-500 hover:text-cfl-blue uppercase tracking-widest transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-2" />
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            <span className="text-sm font-black text-cfl-orange uppercase tracking-widest">
              {currentPage}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
