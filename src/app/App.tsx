import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { DetailsPage } from "@pages/DetailsPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/task/:id" element={<DetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
