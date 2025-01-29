import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOriginalUrl } from "../services/UrlService";

const ShortUrlRedirect = () => {
    const { shortCode } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOriginalUrl = async () => {
            try {
                const originalUrl = await getOriginalUrl(shortCode);
                if (originalUrl) {
                    window.location.replace(originalUrl); 
                } else {
                    setError("Ссылка не найдена.");
                }
            } catch (err) {
                setError("Ошибка при загрузке ссылки.");
            }
        };

        fetchOriginalUrl();
    }, [shortCode]);

    return error ? <h2>{error}</h2> : <p>Перенаправление...</p>;
};

export default ShortUrlRedirect;