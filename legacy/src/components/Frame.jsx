/**
 * TODO: Convert to routes, use Suspense to lazy load routes
 * TODO: Save state of each route after use
 */

import React, { useState } from 'react';
import styled from 'styled-components';

import Landing from './Landing';

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
    <StyledFrame>
      <ul className='menu'>
        <MenuItems />
      </ul>
      <div className='content'>{activeItem}</div>
    </StyledFrame>
  );
}

const StyledFrame = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  height: calc(100vh - 2rem);

  .menu {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    max-width: 20%;
    max-height: 100vh;
    overflow-y: auto;
  }

  .menu li {
    cursor: pointer;
    padding: 0.75rem 0.5rem;
    border-radius: 0.5rem;
    text-align: center;
  }

  .menu li.active {
    background-color: #1a2126;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #1a2126;
    border-radius: 0.5rem;
  }
`;
