import React from "react";
import s from "../WarningDataList/WarningData.module.css";
import {Button} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import rootStore from "../../../../store/RootStore/instance"
import { observer } from "mobx-react";
import EditIcon from '@material-ui/icons/Edit';
import Modal from "../../../../Components/Modal/Modal";
import {useState} from "react"

const WarningDataList = () => {
    const [visibleModal,setVisibleModal] = useState({
        name:"",
        visible:false
    });

    const handleCloseModal = React.useCallback(() => {
        setVisibleModal({
            name:visibleModal.name,
            visible:false
        });
    }, [setVisibleModal]);

    React.useEffect(() => {
        rootStore.tools.getNotReturnedTools();
    }, []);

    React.useEffect(() => {
        return () => {
            rootStore.tools.setNotReturnedTools(null);
        }
    }, []);

    return (
        <>
            <div className={s.datalist}>
                { rootStore.tools.notReturnedTools !== null && rootStore.tools.notReturnedTools?.map((tool) => {
                    return (
                        <div className={s.datalistprobbtn} key={tool.id}>
                    <div className={s.datalistinner}>
                        <div className={s.datalistitems}>
                            <h3>{tool.title}</h3>
                        </div>
                        <div className={s.datalistitems}>
                            <h3>Номер: {tool.attr?.serialNumber}</h3>
                        </div>
                        <div className={s.datalistitems}>
                            <h3>мм/дм/см: {tool?.attr?.diameter}</h3>
                        </div>
                        <div className={s.datalistitems}>
                            <h3>Сотрудник: {tool.employeeName}</h3>
                        </div>
                        <div className={s.datalistitems}>
                            <h3>Дата и время: {`${tool.date.DMY}  ${tool.date.time}`}</h3>
                        </div>
                        <div className={s.datalistitems}>
                            <h3 style={{color:"red"}}>{tool.extradited === true ? "Не вернул" : "Вернул"}</h3>
                        </div>
                    </div>
                    <div className={s.wardatabtn}>
                        <Button
                        onClick={()=>setVisibleModal({
                            name:"вернуть инструмент",
                            visible:true
                        })}
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                        >
                            Вернуть
                        </Button>
                        <Button
                        onClick={()=>setVisibleModal({
                            name:"удалить",
                            visible:true
                        })}
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                        >
                            Удалить
                        </Button>
                        {visibleModal&& <Modal elementId={tool.id} visibleModal={visibleModal} handleCloseModal={handleCloseModal} />}
                    </div>
                </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default observer(WarningDataList);