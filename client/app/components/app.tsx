/* APP STARTS HERE */

import React, { FunctionComponent, ReactElement } from 'react'
import { hot } from 'react-hot-loader/root'
import { cold, setConfig } from 'react-hot-loader'
import { Provider } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Pages } from '../routers/routes'
import { configureStore } from '../store/configure-store'

// initialize redux store
const store = configureStore()

// initialize apollo client
const client = new ApolloClient({ uri: 'http://localhost:3030/graphql' })

// dispatch to store
// store.dispatch(invoiceStatus(false));

// get and set tokens
// if (!localStorage.getItem('jwt')) {
//     localStorage.setItem('jwt', 'token');
// }

export const App: FunctionComponent = (): ReactElement => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Pages />
    </Provider>
  </ApolloProvider>
)

export default hot(App)
