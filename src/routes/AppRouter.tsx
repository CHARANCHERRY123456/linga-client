import LoginPage from "../pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import SignupPage from "../pages/SignupPage";
import { HomePage } from "../pages/HomePage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* public router */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                {/* private router */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}