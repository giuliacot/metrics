import { QueryClient, QueryClientProvider } from 'react-query'
import { createRoutesFromChildren, Route, RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { MetricsSetup } from './pages/handle-metrics/MetricsSetup'
import style from './App.module.scss'

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route errorElement={<div>Error page</div>}>
      <Route
        path="/"
        element={
          <div className={style.pageBaseLayour}>
            <MetricsSetup />
          </div>
        }
      />
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
