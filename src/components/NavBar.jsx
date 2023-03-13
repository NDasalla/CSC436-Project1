import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <>
      <Navbar bg="black" variant="dark" fixed="top" text-color="white">
        <Container>
          <Navbar.Brand>Currency Conversion</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Current Rates</Nav.Link>
            <Nav.Link href="/conversions">Conversions</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
