import React from "react";
import s from "./DataList.module.css"
import { observer } from "mobx-react";
import rootStore from "../../../../store/RootStore/instance";
import axios from "axios";
import { serverHost } from "../../../../config/serverHost";


const DataList = () =>{

    React.useEffect(() => {
        rootStore.tools.getReturnedTools();
    }, []);

    React.useEffect(() => {
        return () => {
            rootStore.tools.setReturnedTools(null);
        }
    }, []);

    return (
        <> 
            <div className={s.datalist}>
            { rootStore.tools.returnedTools !== null && rootStore.tools.returnedTools?.map((tool) => {
                return (
                    <div className={s.datalistinner} key={tool.id}>
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
                        <h3 style={{color:"green"}}>{tool.extradited === true ? "Не вернул" : "Вернул"}</h3>
                    </div>
                </div>
                )
            })
            }  
            </div>
        </>
    )
}
export default observer(DataList);