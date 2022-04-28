import React, { useState,useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import InlineAlert from './InlineAlert';
import swal from 'sweetalert';


function Header() {
	
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	// useEffect(() => {
	// 	// console.log(localStorage.getItem('user'));
	// 	if (!localStorage.getItem('user')) navigate('/');
	//   },[]);

	const user = JSON.parse(localStorage.getItem('user'));

	const handleYes = () => { 
		setShow(false);
		localStorage.removeItem('user');
		navigate('/');
	  }
	  const handleNo = () => {
		setShow(false);
	  }
	const handleShow = () => setShow(true);

	const [query, setQuery] = useState("");

	function handleClick() {
		navigate('/Profile/'+ user['username']);
		// window.location.reload(false);
	}

	function handleSearch() {
		if(query.length > 0) {
			navigate('SearchResults/' + query);
			window.location.reload(false);
		} else swal('search is empty')

	}
	  
    if (window.location.pathname === '/Login' || window.location.pathname === '/signup')
		return (
        <div className="My-header" style={{background: 'black'}}>
			<Navbar bg="dark" variant="dark">
			  <Container>
			  <Navbar.Brand>PurdueCircle</Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
			  </Container>
			</Navbar>
        </div>
    );
	else if (!user)
	return (
        <div className="My-header" style={{background: 'black'}}>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

			<Container>
				<Navbar.Brand onClick={() => navigate('/')}>PurdueCircle</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" collapseOnSelect="true">
  				<Nav className="me-auto">
				  <Nav.Link href="/Login">Log In</Nav.Link>
				  <Nav.Link href="/signup">Sign Up</Nav.Link>
  				</Nav>


				<Form className="d-flex" onSubmit={handleSearch}>
        		<FormControl
          		type="text"
          		placeholder="Search For User or Topic"
          		className="me-2"
          		aria-label="Search"
				onChange = {e => setQuery(e.target.value)} value={query}
        		/>
        		<Button type='submit' variant="outline-success">Search</Button>
      			</Form>
				</Navbar.Collapse>
			</Container>
			</Navbar>
        </div>
	);
    else return (
        <div className="My-header" style={{background: 'black'}}>

			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

			  <Container>
			  <Navbar.Brand onClick={() => navigate('/homepage')}>PurdueCircle</Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
			  <Navbar.Collapse id="responsive-navbar-nav" collapseOnSelect="true">
				

				<Nav>
				  <Nav.Link href="/createTopic">Create Topic</Nav.Link>
				  <Nav.Link href="/SavedPosts">Saved Posts</Nav.Link>
				  <NavDropdown title={user['username']} id="navbarScrollingDropdown">
					  <NavDropdown.Item onClick={handleClick}>View Profile</NavDropdown.Item>
					  <NavDropdown.Divider />
					  <NavDropdown.Item onClick={handleShow}>Logout</NavDropdown.Item>
				  </NavDropdown>
					<Modal show={show} onHide={handleNo}>
					<Modal.Header closeButton>
					  <Modal.Title>Logout</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to Logout?</Modal.Body>
					<Modal.Footer>
					  <Button variant="secondary" onClick={handleNo}>
						No
					  </Button>
					  <Button variant="primary" onClick={handleYes}>
						Yes
					  </Button>
					</Modal.Footer>
					</Modal>
			  </Nav>

			  <Nav className="me-auto">
			</Nav>

			  <Form className="d-flex" onSubmit={handleSearch}>
        		<FormControl
          		type="text"
          		placeholder="Search For User or Topic"
          		className="me-2"
          		aria-label="Search"
				onChange = {e => setQuery(e.target.value)} value={query}
        		/>
        		<Button type='submit' variant="outline-success">Search</Button>
      			</Form>
			  </Navbar.Collapse>
			  </Container>
			</Navbar>
        </div>
    );
}

export default Header;
