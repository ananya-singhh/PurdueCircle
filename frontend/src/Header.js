import React, { useState,useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function Header() {
	
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// console.log(localStorage.getItem('user'));
		if (!localStorage.getItem('user')) navigate('/');
	  },[]);

	const user = JSON.parse(localStorage.getItem('user'));

	const handleClose = () => {
		setShow(false);
		localStorage.removeItem('user');
		navigate('/');
	}
	const handleShow = () => setShow(true);
	  
    if (window.location.pathname === '/Login' || window.location.pathname === '/signup')
		return (
        <div className="My-header">
			<Navbar bg="dark" variant="dark">
			  <Container>
			  <Navbar.Brand>PurdueCircle</Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
			  </Container>
			</Navbar>
        </div>
    );
	else if (window.location.pathname === '/')
	return (
        <div className="My-header">
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

			<Container>
				<Navbar.Brand>PurdueCircle</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" collapseOnSelect="true">
  				<Nav className="me-auto">
  				</Nav>
  				<Nav>
				<Nav.Link href="/">Search for User</Nav.Link>
				</Nav>
				</Navbar.Collapse>
				</Container>
				</Navbar>
        </div>
	);
    return (
        <div className="My-header">

			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

			  <Container>
			  <Navbar.Brand>PurdueCircle</Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
			  <Navbar.Collapse id="responsive-navbar-nav" collapseOnSelect="true">
				<Nav className="me-auto">
				</Nav>
				<Nav>
				  <Nav.Link href="/">Search for User</Nav.Link>
				  <Nav.Link href="/profile">Create Profile</Nav.Link>
				  <Nav.Link href="/message">Direct Message</Nav.Link>
				  <NavDropdown title={user['username']} id="navbarScrollingDropdown">
					  <NavDropdown.Item href="/editprofile">Edit Profile</NavDropdown.Item>
					  <NavDropdown.Item href="/changepwd">Change Password</NavDropdown.Item>
					  <NavDropdown.Divider />
					  <NavDropdown.Item onClick={handleShow}>Logout</NavDropdown.Item>
				  </NavDropdown>
					<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
					  <Modal.Title>Logout</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to Logout?</Modal.Body>
					<Modal.Footer>
					  <Button variant="secondary" onClick={handleClose}>
						No
					  </Button>
					  <Button variant="primary" onClick={handleClose}>
						Yes
					  </Button>
					</Modal.Footer>
					</Modal>
			  </Nav>
			  </Navbar.Collapse>
			  </Container>
			</Navbar>
        </div>
    );
}

export default Header;