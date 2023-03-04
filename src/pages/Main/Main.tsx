import React from "react"
import Logo from "../../Components/Logo/Logo";
import AddInstrument from "./components/AddInstrument/AddInstrument";
import DataList from "./components/DataList/DataList";

import {Container} from "@material-ui/core";

const Main = () => {
    return (
        <div>
            <Logo/>
            <Container  maxWidth="sm">
                <AddInstrument/>
                <DataList/>
            </Container>
        </div>
    );
}

export default Main;