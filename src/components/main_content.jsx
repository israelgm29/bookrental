import {Background_movie} from "./background_movie";
import {Movies_section} from "./movies_section";

import {Col, Row} from "react-bootstrap";


export const Main_content = () => {
    return <main className="container-fluid">
        <Row className="justify-content-center">
            <h4><strong>Peliculas Populares</strong></h4>
            <Col xs={12}>
                <Background_movie></Background_movie>
            </Col>

        </Row>
        <Row>
            <Movies_section></Movies_section>
        </Row>

    </main>
}