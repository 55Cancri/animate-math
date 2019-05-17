// #region package imports
import React, {
  Component,
  Fragment,
  FunctionComponent,
  ReactElement,
  useState
} from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import posed, { PoseGroup } from "react-pose";
import { createBrowserHistory as createHistory } from "history";

// import createHistory from 'history/createBrowserHistory'

// #endregion package imports
// #region page component imports
import ModalContainer from "@components/modals/modal-container";

import LoginPage from "@components/pages/login-page";
import DashboardPage from "@components/pages/dashboard-page";
import GeneticsPage from "@components/pages/genetics-page";
import KNNPage from "@components/pages/knn-page";
import NotFoundPage from "@components/pages/not-found-page";

import PrivateRoute from "./private-route";
import PublicRoute from "./public-route";
import settings from "@settings";
import { Store } from "@types";

// #endregion page component imports

// initialize the history object
export const history = createHistory();

// define window object
const Window = globalThis.window;

const RouteContainer = posed.div({
  enter: {
    delay: 0,
    x: 0,
    opacity: 1,
    transition: { x: { type: "spring", damping: 15 } }
  },
  exit: {
    x: ({ width }) => (width < 1000 ? -50 : -200),
    opacity: 0,
    transition: { x: { type: "spring", damping: 15 } }
  }
});

export const Pages: FunctionComponent = (): ReactElement => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const { width } = dimensions;

  return (
    <Router history={history}>
      <Route
        render={({ location }) => (
          <div className="app" style={{ position: "relative" }}>
            <ModalContainer />
            <PoseGroup animateOnMount flipMove={false} className="page">
              <RouteContainer width={width} key={location.pathname}>
                <Switch location={location}>
                  <PublicRoute
                    key="login"
                    path="/login"
                    component={LoginPage}
                  />
                  <PublicRoute
                    key="dashboard"
                    exact
                    path="/"
                    component={DashboardPage}
                  />
                  <PublicRoute
                    key="genetic-algorithm"
                    path="/ga"
                    component={GeneticsPage}
                  />
                  <PublicRoute
                    key="k-nearest-neighbors"
                    path="/knn"
                    component={KNNPage}
                  />
                  <Route key="unknown" component={NotFoundPage} />
                </Switch>
              </RouteContainer>
            </PoseGroup>
          </div>
        )}
      />
    </Router>
  );
};

const mapStateToProps = (state: Store) => ({});

export default connect(mapStateToProps)(Pages);
