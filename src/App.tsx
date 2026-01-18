import { TaskBoard } from '@/components/TaskBoard';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <TaskBoard />
    </ErrorBoundary>
  );
}

export default App;
