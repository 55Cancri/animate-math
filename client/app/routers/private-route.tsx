import React, { Component } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import * as H from "history";
import ModalContainer from "@components/modals/modal-container";

import Header from "@common/header";

interface RouteProps {
  location?: H.Location;
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?:
    | ((props: RouteComponentProps<any>) => React.ReactNode)
    | React.ReactNode;
  path?: string;
  exact?: boolean;
  strict?: boolean;
}

interface StateProps {
  power?: boolean;
  sidebar?: boolean;
  isAuthenticated?: boolean;
}

interface DispatchProps {
  startLogout?: () => void;
}

type Props = StateProps & DispatchProps & RouteProps;

class PrivateRoute extends Component<Props> {
  state = {};

  render = () => {
    // eslint-disable-next-line no-shadow
    const { isAuthenticated, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        component={props =>
          isAuthenticated ? (
            <div className="private">
              <div className="content">
                <Header />
                <Component {...props} />
              </div>

              <ModalContainer />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
});

export default connect<StateProps, DispatchProps, RouteProps>(mapStateToProps)(
  PrivateRoute
);
