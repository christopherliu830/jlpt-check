import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { theme } from './theme/theme';

import { PageContainer } from './components/PageContainer/PageContainer';
import { Landing } from './components/Landing/Landing';
import { Quiz } from './components/Quiz/Quiz';

export function App(): React.ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <PageContainer>
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/quiz" exact>
              <Quiz />
            </Route>
          </Switch>
        </PageContainer>
      </Router>
    </ChakraProvider>
  );
}
