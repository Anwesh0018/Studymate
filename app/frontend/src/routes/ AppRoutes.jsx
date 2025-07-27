import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login"
                       element={<LoginPage/>} />
                {/*more routes will go under this*/}
            </Routes>
        </Router>
    );
};

export default AppRoutes;