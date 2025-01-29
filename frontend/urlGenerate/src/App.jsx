import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createShortUrl, fetchUserUrls, getOriginalUrl } from "./services/UrlService.js";
import Header from "./components/Header.jsx";
import CreateUrlForm from "./components/CreateUrlForm";
import UrlItem from "./components/UrlItem";

function RedirectHandler() {
    const { shortCode } = useParams();
    const [originalUrl, setOriginalUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOriginalUrl = async () => {
            try {
                const response = await fetch(`https://localhost:5001/api/Url/${shortCode}`);
                if (!response.ok) throw new Error("Short URL not found");

                const url = await response.text();
                setOriginalUrl(url);

                // Меняем заголовок вкладки на оригинальный сайт (улучшает UX)
                document.title = url;
            } catch (error) {
                console.error("Error fetching original URL:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOriginalUrl();
    }, [shortCode]);

    if (isLoading) return <p>Redirecting...</p>;

    if (!originalUrl) return <h1>Short URL not found</h1>;

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <iframe
                src={originalUrl}
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Redirected Page"
            />
        </div>
    );
}
function MainPage() {
    const [urls, setUrls] = useState([]);
    const userId = "some-unique-user-id";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userUrls = await fetchUserUrls(userId);
                setUrls(userUrls);
            } catch (error) {
                console.error("Error fetching URLs:", error);
            }
        };

        fetchData();
    }, [userId]);

    const onCreate = async (originalUrl) => {
        try {
            const shortUrl = await createShortUrl(originalUrl);
            setUrls((prevUrls) => [
                ...prevUrls,
                { id: Date.now(), shortUrl, originalUrl, createdAt: new Date().toISOString() },
            ]);
        } catch (error) {
            console.error("Error creating URL:", error);
        }
    };

    return (
        <section className="p-8 flex flex-row justify-start items-start gap-12">
            <div className="flex flex-col w-1/3 gap-10">
                <CreateUrlForm onCreate={onCreate} />
            </div>
            <ul className="flex flex-col gap-5 w-1/2">
                {urls.map((url) => (
                    <li key={url.id}>
                        <UrlItem shortUrl={url.shortUrl} originalUrl={url.originalUrl} createdAt={url.createdAt} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:shortCode" element={<RedirectHandler />} />
                <Route path="/not-found" element={<h1>Short URL not found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;