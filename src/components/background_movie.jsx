import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_KEY, API_URL, IMAGE_PATH, IMAGE_PATH_BACKGROUND} from "../util/Consts";
import {Badge, Carousel, CarouselCaption, CarouselItem, Image} from "react-bootstrap";

export const Background_movie = () => {
    const [moviesTop, setMoviesTop] = useState([]);
    const getTopMovies = async () => {
        const {data: {results}} = await axios.get(`${API_URL}/movie/top_rated`, {
            params: {
                api_key: API_KEY,

            }
        });
        setMoviesTop(results)
    }

    useEffect(() => {
        getTopMovies()
    }, []);


    return <Carousel showControls showIndicators dark fade>
        {moviesTop.map((movie, index) =>
            <CarouselItem>
                <Image src={`${IMAGE_PATH_BACKGROUND + movie.backdrop_path}`} width="100%" height="350" alt='...'/>
                <CarouselCaption>
                    <h1 className="font-weight-bold">{movie.title}</h1>
                    <p className="text-light">{movie.overview}</p>
                    <p><Badge pill bg="danger">Calificacion: {movie.vote_average}</Badge>  <Badge pill bg="primary">Año: {movie.release_date}</Badge> </p>
                </CarouselCaption>
            </CarouselItem>
        )}
    </Carousel>
}