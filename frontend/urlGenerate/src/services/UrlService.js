import axios from "axios";

const API_BASE = "https://localhost:5001/api/Url";

export const createShortUrl = async (originalUrl) => {
    const response = await axios.post(`${API_BASE}/create`, originalUrl, {
        headers: { "Content-Type": "application/json" }
    });
    return response.data.shortUrl;
};

export const fetchUserUrls = async (userId) => {
    const response = await axios.get(`${API_BASE}/user/${userId}/urls`);
    return response.data;
};

export const getOriginalUrl = async (shortCode) => {
    const response = await axios.get(`${API_BASE}/${shortCode}`);
    window.location.replace(response.data);
};