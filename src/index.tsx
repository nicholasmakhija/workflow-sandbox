import { createRoot } from 'react-dom/client';

import { App } from './components/App';

import { APP_DATA } from './constants';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<App currentPage={window[APP_DATA] || ''} />);
