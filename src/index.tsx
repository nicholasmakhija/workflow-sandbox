import { createRoot } from 'react-dom/client';

import { App } from './components/App/App';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<App />);
