
import './App.css';

import SurveyForm from "./pages/SurveyForm";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import UserProfile from "./pages/UserProfile";



function App() {



  return (
      <Router>
          <Routes>

              {/* all routes that look like /users/chris will be handled by the UserProfile component */}
              <Route path="/:surveyId" element={<div className="App"> <SurveyForm/>  </div>} />

          </Routes>
      </Router>

  );
}

export default App;
