import React, { FunctionComponent, ReactElement } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { hot } from "react-hot-loader/root";

export const Header: FunctionComponent = (): ReactElement => {
  return (
    <div className="main-header">
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/ga">genetic algorithm</Link>
        </li>
        <li>
          <Link to="/knn">k-nearest neighbors</Link>
        </li>
        <li>
          <Link to="/nn">neural networks</Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = () => ({});

// export default connect(mapStateToProps)(Header)
export default hot(connect(mapStateToProps)(Header));
