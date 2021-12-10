
function Survey(props) {
    console.warn(props);
    return (
        <div>
            <h1>Survey component {props.match.params.id}</h1>
        </div>
    )
}

export default Survey ;