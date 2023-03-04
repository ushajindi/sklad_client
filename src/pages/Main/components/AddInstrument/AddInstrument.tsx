import React from "react";
import { observer } from "mobx-react";
import s from "./AddInstrument.module.css"
import {Button, TextField} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import {Close} from "@material-ui/icons";
import { useLocalStore } from "../../../../utils/useLocalStore";
import AddInstrumentStore from "../../../../store/AddInstrumentStore/AddInstrumentStore";
import cn from "classnames";

const AddInstrument = () => {

    const instrumentTitleRef = React.useRef<HTMLInputElement>(null);
    const instrumentSerialNumberRef = React.useRef<HTMLInputElement>(null);
    const instrumentDiameterRef = React.useRef<HTMLInputElement>(null);
    const instrumentEmployeeRef = React.useRef<HTMLInputElement>(null);
    

    const addInstrumentStore = useLocalStore(() => new AddInstrumentStore());
    React.useEffect(() => {
        if (instrumentTitleRef.current) {
            instrumentTitleRef.current.value = "";
        }

        if (instrumentEmployeeRef.current) {
            instrumentEmployeeRef.current.value = "";
        }

        if (instrumentSerialNumberRef.current) {
            instrumentSerialNumberRef.current.value = "";
        }

        if (instrumentDiameterRef.current) {
            instrumentDiameterRef.current.value = "";
        }

    }, [addInstrumentStore.instrument]);

    return(
        <div className={cn(s.addinner,"animate__animated animate__slideInRight animate__delay-0.3s" )}>
            <div className={s.additem}>
                <input  ref={instrumentTitleRef} placeholder="Название инструмента"
                className={cn(addInstrumentStore.addAlert.title && s.input__absence)}
                onChange={addInstrumentStore.setInstrumentTitle}/>
                <div className={s.additemchild}>
                    <div className={s.additemchilditems}>
                        <input placeholder="Номер" ref={instrumentSerialNumberRef}
                        onKeyDown={(event) => {
                            if (event.key >= '0' && event.key < '9' || event.key == 'Backspace') {
                            } else {
                                event.preventDefault();
                            }
                        }} onChange={addInstrumentStore.setSerialNumber}
                       />
                    </div>
                    <div className={s.additemchilditems}>
                        <input placeholder="дм/мм/см" ref={instrumentDiameterRef}
                            onChange={addInstrumentStore.setDiameter} />
                    </div>
                </div>
                <input  placeholder="Имя сотрудника" type="text" ref={instrumentEmployeeRef}
                className={cn(addInstrumentStore.addAlert.employ && s.input__absence)}
                onChange={addInstrumentStore.setEmployeeName} />
                <div className={s.addbtn}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<SaveIcon />}
                        onClick={addInstrumentStore.saveButtonClick}
                    >
                        Сохранить
                    </Button>
                </div>


            </div>
        </div>
    )
}
export default observer(AddInstrument);