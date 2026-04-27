import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {QueryClientProvider} from '@tanstack/react-query'
import {App} from './app/App'
import {configureApiClient} from './lib/apiClient'
import {queryClient} from './lib/queryClient'

configureApiClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <App/>
      </QueryClientProvider>
  </StrictMode>,
)
