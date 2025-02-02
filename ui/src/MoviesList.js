import MovieListItem from "./MovieListItem";
import Loading from "./Loading";

export default function MoviesList(props) {
    return <div>
        <h2>Movies</h2>
        {props.movies.length === 0
            ? <Loading />
        :<ul className="movies-list">
            {props.movies.map(movie => <li key={movie.title}>
                <MovieListItem movie={movie} onDelete={() => props.onDeleteMovie(movie)}/>
            </li>)}
        </ul>}
    </div>;

}
