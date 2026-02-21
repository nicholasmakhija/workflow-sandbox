import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App';

import { APP_DATA } from './constants';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<App {...window[APP_DATA]} pages={{}} />);
