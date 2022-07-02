import { Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Link to="/about">
                <Button> عن الصفحة</Button>
            </Link>
            <Text>الرئيسية</Text>
        </div>
    );
};

export default Home;
