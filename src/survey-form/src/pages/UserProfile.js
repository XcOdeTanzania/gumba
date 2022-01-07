// the UserProfile component
import { useParams } from "react-router-dom";

export default function UserProfile() {
    // get the username from route params
    const { surveyId } = useParams();

    // now we have access to the username that came from the URL
    return <div>hi there {surveyId}</div>;
}