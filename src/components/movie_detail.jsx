import axios from "axios";
import {API_KEY, API_URL, IMAGE_PATH, IMAGE_PATH_BACKGROUND} from "../util/Consts";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    Badge, Button,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle,
    Row
} from "react-bootstrap";
import YouTube from "react-youtube";

export const Movie_detail = () => {
    const [trailer, setTrailer] = useState(null);
    const [movieDetail, setMovieDetail] = useState([]);
    const [playing, setPlaying] = useState(false);
    const id = useParams().id;
    const [showBuy, setShowBuy] = useState(false);
    const [showMovie, setShowMovie] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);

    const handleClose = () => setShowBuy(false);
    const handleShow = () => setShowBuy(true);

    const handleCloseMovie = () => setShowMovie(false);
    const handleShowMovie = () => setShowMovie(true);
    const fetchMoviesDetail = async () => {
        await axios.get(`${API_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos",
            }
        }).then(response => {
            const movieD = response.data
            if (movieD.videos && movieD.videos.results) {
                const trailer = movieD.videos.results.find(
                    (vid) => vid.name === "Official Trailer"
                );
                setTrailer(trailer ? trailer : movieD.videos.results[0]);
            }
            setMovieDetail(movieD)
        });
    }

    useEffect(() => {
        fetchMoviesDetail()
    }, []);

    return <Container fluid style={{
        backgroundImage: `url(${IMAGE_PATH + movieDetail.backdrop_path})`,
        width: "100%",
        height: "auto",
        backgroundSize: "cover"
    }}>
        {<div>
            <Row>
                <Col xs={"3"}>
                    <Card>
                        <Card.Img variant="top" src={`${IMAGE_PATH_BACKGROUND + movieDetail.poster_path}`}/>
                    </Card>
                </Col>
                <Col xs={"9"}>
                    <Card className="bg-dark mt-3 opacity-75" border={"light"}>
                        <CardBody className="text-light">
                            <CardTitle> {movieDetail.title}</CardTitle>
                            <small>Lenguaje: {movieDetail.original_language}</small>
                            <CardText>
                                {movieDetail.overview}
                            </CardText>
                            <Badge pill> Fecha de lanzamiento: {movieDetail.release_date}</Badge>
                        </CardBody>

                    </Card>
                </Col>
                <Col className={"d-flex align-items-center"}>
                    <div className="mt-4 d-flex flex-row">
                        <div className="p-2"><Button className={"btn-primary"} onClick={handleShow}> Aquilar
                            Pelicula</Button></div>

                        <Modal  show={showBuy} onHide={handleClose}>
                            <ModalHeader closeButton>
                                <ModalTitle>¿Estas seguro que quieres alquilar esta pelicula?</ModalTitle>
                            </ModalHeader>
                            <ModalBody>
                            <Card.Img variant="top" width={400} height={400} src={`${IMAGE_PATH_BACKGROUND + movieDetail.poster_path}`}/>
                                <p>Titulo: <small className="fst-italic text-primary">{movieDetail.title}</small></p>
                                <p>Fecha: <small className="fst-italic text-primary">{movieDetail.release_date}</small>
                                </p>
                            </ModalBody>

                            <ModalFooter>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancelar
                                </Button>
                                <Button itemID={1} variant="primary" onClick={handleShowMovie}>
                                    Alquilar
                                </Button>
                            </ModalFooter>
                        </Modal>
                        <Modal  show={showMovie} fullscreen={fullscreen} onHide={() => setShowMovie(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>{movieDetail.original_title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                    {playing ? (
                                        <>
                                            <YouTube
                                                videoId={trailer.key}
                                                className="reproductor container-fluid"
                                                containerClassName={"youtube-container amru"}
                                                opts={{
                                                    width: "100%",
                                                    height: "100%",
                                                    playerVars: {
                                                        autoplay: 1,
                                                        controls: 1,
                                                        cc_load_policy: 0,
                                                        fs: 1,
                                                        iv_load_policy: 0,
                                                        rel: 0,
                                                    },
                                                }}
                                            />
                                            <br></br>
                                            <Button onClick={() => setPlaying(false)} className="boton">
                                                Cerrar Reproductor
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="container">
                                            <div className="">
                                                {trailer ? (
                                                    <Button className={"btn-danger"} onClick={() => setPlaying(true)}>Ver
                                                        Trailler</Button>

                                                ) : (
                                                    "Sorry, no trailer available"
                                                )}

                                            </div>
                                        </div>
                                    )}

                            </Modal.Body>
                        </Modal>
                    </div>

                </Col>
            </Row>
        </div>}
    </Container>
}