import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

class AppHeader extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Container className="text-center d-block">
          <Navbar.Brand href="/" className="m-0">TODO</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default AppHeader;