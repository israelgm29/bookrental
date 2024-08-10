import React, {useEffect, useState} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_KEY, API_URL} from "../util/Consts";

export const Nav_bar = () => {
    const [genres, setGenres] = useState([]);
    const fetchGenres = async () => {
        await axios.get(`${API_URL}/genre/movie/list`, {
            params: {
                api_key: API_KEY,
            }
        }).then(response => {
            const genderList = response.data

            setGenres(genderList)
            console.log(genres)

        });
    }

    useEffect(() => {
        fetchGenres()
    }, []);

    return <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand> <Link className={"navbar-brand"} to="/">RENT MOVIES</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Series</Nav.Link>
                    <Nav.Link href="#link">Peliculas</Nav.Link>
                    <NavDropdown title="Generos" id="basic-nav-dropdown">

                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}