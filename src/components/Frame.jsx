import React, { useState } from 'react';

import Landing from './Landing';
import './Frame.css';

export default function Frame({ children }) {
  const [activeItem, setActiveItem] = useState(<Landing />);
  const menu = [];

  function addToMenu(child) {
    menu.push({
      title: child.props.title,
      payload: child,
    });
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      addToMenu(child);
    }
  } else {
    addToMenu(children);
  }

  function MenuItem({ title, payload }) {
    function handleClick() {
      setActiveItem(payload);
    }

    return (
      <li
        onClick={handleClick}
        className={activeItem.props.title === title ? 'active' : ''}
      >
        {title}
      </li>
    );
  }

  function MenuItems() {
    return menu.map(({ title, payload }) => (
      <MenuItem key={title} title={title} payload={payload} />
    ));
  }

  return (
    <div className='frame'>
      <ul className='menu'>
        <MenuItems />
      </ul>
      <div className='content'>{activeItem}</div>
    </div>
  );
}
