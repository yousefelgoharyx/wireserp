import { Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div>
            <Link to="/">
                <Button>الرئيسية</Button>
            </Link>
            <Text>عن الصفحة</Text>
        </div>
    );
};

export default About;
