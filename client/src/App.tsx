import { QueryClient, QueryClientProvider } from 'react-query'
import { createRoutesFromChildren, Route, RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { MetricsSetup } from './pages/handle-metrics/MetricsSetup'

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route errorElement={<div>Error page</div>}>
      <Route path="/" element={<MetricsSetup />} />
    </Route>
  )
)

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
