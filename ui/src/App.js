import './App.css';
import {useState} from "react";
import {useEffect} from 'react';
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorForm from "./ActorForm";
import ActorsList from "./ActorsList";
import { ToastContainer, toast } from 'react-toastify';


function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [actors, setActors] = useState([]);
    const [addingActor, setAddingActor] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`/movies`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchActors = async () => {
            const response = await fetch(`/actors`);
            if (response.ok) {
                const actors = await response.json();
                setActors(actors);
            }
        };
        fetchActors();
    }, []);

    async function handleAddMovie(movie) {
      const response = await fetch('/movies', {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {toast ("Movie added successfully");
        const movieFromServer = await response.json();
        setMovies([...movies, movieFromServer]);
        setAddingMovie(false);
      }
    }

    async function handleAddActor(actor) {
      const response = await fetch('/actors', {
        method: 'POST',
        body: JSON.stringify(actor),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const actorFromServer = await response.json();
        setActors([...actors, actorFromServer]);
        setAddingActor(false);
      }
    }

    async function handleDeleteMovie(movie) {
        const response = await fetch(`/movies/${movie.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const nextMovies = movies.filter(m => m !== movie);
            setMovies(nextMovies);
        }
    }

    async function handleDeleteActor(actor) {
        const response = await fetch(`/actors/${actor.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const nextActors = actors.filter(m => m !== actor);
            setActors(nextActors);
        }
    }

    return (
        <div className="container">
            <ToastContainer />
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              onDeleteMovie={handleDeleteMovie}
                />}
            {addingMovie
                ? <MovieForm onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movie"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}

            {actors.length === 0
                ? <p>No actors yet. Maybe add somebody?</p>
                : <ActorsList actors={actors}
                              onDeleteActor={handleDeleteActor}
                />}
            {addingActor
                ? <ActorForm onActorSubmit={handleAddActor}
                             buttonLabel="Add an actor"
                />
                : <button onClick={() => setAddingActor(true)}>Add an actor</button>}
        </div>
    );

}

export default App;
