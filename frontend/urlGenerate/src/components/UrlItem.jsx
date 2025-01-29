import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Heading,
	Text,
	Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function UrlItem({ shortUrl, originalUrl, createdAt }) {
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault(); // Отключаем стандартное поведение ссылки
		const shortCode = shortUrl.split("/").pop(); // Получаем код ссылки
		navigate(`/${shortCode}`); // Переход через React Router
	};

	return (
		<Card variant={"filled"}>
			<CardHeader>
				<Heading size={"md"}>Short URL</Heading>
			</CardHeader>
			<Divider borderColor={"gray"} />
			<CardBody>
				<Text>
					<strong>Original URL:</strong>{" "}
					<Link href={originalUrl} color="blue.500" isExternal>
						{originalUrl}
					</Link>
				</Text>
				<Text mt={2}>
					<strong>Short URL:</strong>{" "}
					<Link href={shortUrl} color="blue.500" onClick={handleClick}>
						{shortUrl}
					</Link>
				</Text>
			</CardBody>
			<Divider borderColor={"gray"} />
			<CardFooter>
				<Text>
					<strong>Created At:</strong>{" "}
					{moment(createdAt).format("DD/MM/YYYY h:mm:ss")}
				</Text>
			</CardFooter>
		</Card>
	);
}
