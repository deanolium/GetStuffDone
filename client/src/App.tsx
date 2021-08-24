import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import TodoPage from './components/TodoPage'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <TodoPage />
    </QueryClientProvider>
  )
}

export default App
