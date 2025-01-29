import { useState } from "react";

function CreateUrlForm({ onCreate }) {
    const [originalUrl, setOriginalUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!originalUrl.trim()) return;

        await onCreate(originalUrl);
        setOriginalUrl("");
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
                type="url"
                placeholder="Enter the original URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Create Short URL
            </button>
        </form>
    );
}

export default CreateUrlForm;