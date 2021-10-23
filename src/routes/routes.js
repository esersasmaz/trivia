import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Quiz from '../pages/Quiz';
import Timeout from '../pages/Timeout';
import Welcome from '../pages/Welcome';
import Final from '../pages/Final';
import ErrorBoundaries from "../components/ErrorBoundaries";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Welcome}/>
      <Route path="/quiz" exact component={Quiz}/>
      <Route path="/timeout" exact component={Timeout} />
      <Route path="/final" exact component={Final} />
      <Route component={ErrorBoundaries} />
    </Switch>
  );
}

export default Routes;