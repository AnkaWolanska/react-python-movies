import ActorListItem from "./ActorListItem";
import Loading from "./Loading";

export default function ActorsList(props) {
    return <div>
        <h2>Actors</h2>
        {props.actors.length === 0
            ? <Loading />
        :<ul className="actors-list">
            {props.actors.map(actor => <li key={actor.surname}>
                <ActorListItem actor={actor} onDelete={() => props.onDeleteActor(actor)}/>
            </li>)}
        </ul>}
    </div>;
}