import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

class AppHeader extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <button id="drawer-toggle" className="btn d-lg-none" onClick={this.props.toggleSideBar}>
          <i className="zmdi zmdi-menu"></i>
        </button>
        <Container className="text-center d-block">
          <Navbar.Brand href="/" className="m-0">TODO</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default AppHeader;