import logo from './logo.svg';
import {Nav_bar} from './components/nav_bar';
import {Footer} from "./components/footer";
import {Main_content} from "./components/main_content";
import {Background_movie} from "./components/background_movie";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Movie_detail} from "./components/movie_detail";


function App() {

    return (

            <BrowserRouter>
                <Container fluid >
                    <Nav_bar/>
                    <Routes>
                        <Route path="/" element={<Main_content/>}/>
                        <Route path="/movie/:id" element={<Movie_detail/>}/>

                    </Routes>

                    <Footer></Footer>
                </Container>

            </BrowserRouter>

    );
}

export default App;
