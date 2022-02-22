import React from 'react';

import { statusTypes, statusData } from '../data/status';

export default function Landing() {
  return (
    <>
      <h1>Welcome</h1>
      <p>Choose a tool from the menu to get started</p>
      <h2>To Do</h2>
      <ul>
        {statusData.map(({ title, status }) => (
          <li key={title}>
            <input
              disabled
              type='checkbox'
              checked={status === statusTypes.completed}
            />
            {title}
            {status === statusTypes.inProgress
              ? ' (In Progress)'
              : ''}
          </li>
        ))}
      </ul>
    </>
  );
}
