import React, { Component } from "react";

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = { hayErrores: false }
  }

  componentDidCatch(error, info) {
    this.setState({ hayErrores: true });
  }

  render(){

    if(this.state.hayErrores) {
      return (
        <div className="mt-5">
          <h1 className="text-center">Ups. Algo ha ido mal!</h1>
          <h2 className="text-center">Favor contacte al departamento de soporte</h2>
        </div>
      )  
    }

    return this.props.children
  }
  
}

export default ErrorBoundary;