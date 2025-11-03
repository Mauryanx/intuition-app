import { AppProviders } from './src/providers/AppProviders';
import { AppRoot } from './src/app/AppRoot';

export default function App() {
  return (
    <AppProviders>
      <AppRoot />
    </AppProviders>
  );
}
