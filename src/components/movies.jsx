import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_KEY, API_URL, IMAGE_PATH} from "../util/Consts";
import {Button, Card, CardGroup, CardImg, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";


export const Movies = () => {
    const [movies, setmovies] = useState([]);
    const [searchMovie, setSearchMovie] = useState("")

    const getMovies = async (searchMovie) => {
        const selection = searchMovie ? "search" : "discover"
        const {data: {results}} = await axios.get(`${API_URL}/${selection}/movie`, {
            params: {
                api_key: API_KEY,
                query: searchMovie,
                page: 2,
            }
        });
        setmovies(results)
    }

    const searchMovies = (e) => {
        e.preventDefault();
        getMovies(searchMovie);
    }

    useEffect(() => {
        getMovies()
    }, []);


    return <Row>
        <div className="mb-2 mt-2">
            <form className='d-flex input-group w-auto' onSubmit={searchMovies}>
                <input type='text' className='form-control' placeholder='Buscar pelicula...' aria-label='Buscar'
                       onChange={e => setSearchMovie(e.target.value)}/>
                <Button color='primary'>Buscar</Button>
            </form>
        </div>

        <CardGroup>
            {movies.map((movie) => (
                    <Col md="2" className="d-flex align-items-stretch mb-2">
                        <Card className="me-1" key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                <CardImg src={`${IMAGE_PATH + movie.poster_path}`} fluid alt={movie.title}/>
                            </Link>
                        </Card>
                    </Col>
                )
            )}
        </CardGroup>
    </Row>
}