import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

/**
 * A header component that allows users to navigate
 * to the Inventory and Add Book pages
 * @returns A header component with links to the Inventory and Add Book pages
 */
export default function Header() {
  return (
    <div className="header">
      <ul className="header-right">
        <li className='add-book'>
          <Link to={"/books"}>Add Book</Link>
        </li>
        <li className='inventory'>
          <Link to={"/"}>Inventory</Link>
        </li>
      </ul>
    </div>
  );
}
