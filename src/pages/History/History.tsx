import React from "react";
import Logo from "../../Components/Logo/Logo";
import WarningDataList from "./components/WarningDataList/WarningDataList";
import {Container} from "@material-ui/core";

const History = () => {
    return (
        <div>
            <Logo/>
            <Container maxWidth="sm">
                <WarningDataList/>
            </Container>
        </div>
    );
}

export default History;