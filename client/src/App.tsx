import { QueryClient, QueryClientProvider } from 'react-query'
import { createRoutesFromChildren, Route, RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { MetricsSetup } from './pages/handle-metrics/MetricsSetup'
import style from './App.module.scss'
import * as Toast from '@radix-ui/react-toast'
import { MetricsView } from './pages/view-metrics/ViewMetrics'

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
      <Route
        path="/view"
        element={
          <div className={style.pageBaseLayour}>
            <MetricsView />
          </div>
        }
      />
    </Route>
  )
)

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast.Provider>
        <RouterProvider router={router} />
        <Toast.Viewport className={style.toastViewport} />
      </Toast.Provider>
    </QueryClientProvider>
  )
}
