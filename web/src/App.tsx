import React from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { PageContainer } from './components/PageContainer/PageContainer';
import { Landing } from './components/Landing/Landing';
import { theme } from './theme/theme';

export function App(): React.ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <PageContainer>
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
          </Switch>
        </PageContainer>
      </Router>
    </ChakraProvider>
  );
}
