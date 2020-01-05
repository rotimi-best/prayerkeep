import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorWrapper extends Component {
  constructor (props) {
    super(props);

    this.state = {
      error: null
    };
  }

  componentDidCatch (error, errorInfo) {
    console.error('Captured Error!:error', error);
    console.error('Captured Error!:errorInfo', errorInfo);

    this.setState({error});
  }

  render () {
    return this.state.error
      ? (
        <div>
          <h1>Oops...something is not right</h1>
          <h3>Please send us a report and we will fix it ASAP.</h3>
        </div>
        )
      : this.props.children;
  }
}

ErrorWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType
  ]).isRequired
};

export default ErrorWrapper;
