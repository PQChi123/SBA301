
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#">Orchid Gallery</Navbar.Brand>
        
        {/* chính là đoạn menu điều hướng bạn đang thắc mắc */}
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#orchids">Orchids</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  );
}