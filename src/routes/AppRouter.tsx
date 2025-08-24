import LoginPage from "../pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import SignupPage from "../pages/SignupPage";
import { HomePage } from "../pages/HomePage";
import ChatLayout from "../components/chat/ChatLayout";
import ChatMessages from "../pages/ChatMessage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* public router */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                {/* private router */}
                <Route path="/home" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />
                <Route path="/" element={
                    <ProtectedRoute>
                        <ChatLayout />
                    </ProtectedRoute>
                } >
                    <Route path=":id" element={
                        <ProtectedRoute>
                            <ChatMessages />
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}