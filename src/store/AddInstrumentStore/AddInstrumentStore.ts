import { makeObservable, observable, action, computed, toJS } from "mobx";
import { ILocalStore } from "../../utils/useLocalStore";
import { ToolType } from "../../store/RootStore/ToolsStore/ToolsStore";
import moment from "moment";
import rootStore from "../RootStore/instance";

type PrivateFields = "_instrument" | "_instrumentTitle" | "_employeeName" | "_serialNumber" | "_diameter" | "_addAlert";
type AddAlert={
    title:boolean;
    employ:boolean;
}
export default class AddInstrumentStore implements ILocalStore {
    private _instrument: ToolType | null = null;

    private _instrumentTitle: string | null = null;
    private _serialNumber: number | null = null;
    private _diameter: number | null = null;
    private _employeeName: string | null = null;
    private _addAlert:AddAlert={
        title:false,
        employ:false
    }


    constructor() {
        makeObservable<AddInstrumentStore, PrivateFields>(this, {
            _instrument: observable,
            setInstrument: action,
            instrument: computed,
            _instrumentTitle: observable,
            setInstrumentTitle: action,
            instrumentTitle: computed,
            serialNumber: computed,
            _serialNumber: observable,
            setSerialNumber: action,
            _diameter: observable,
            setDiameter: action,
            diameter: computed,
            _employeeName: observable,
            setEmployeeName: action,
            employeeName: computed,
            _addAlert:observable,
            setAddAlert:action,
            addAlert:computed,
            saveButtonClick: action,
        })
    }

    setAddAlert(){
        if(this._employeeName && this._instrumentTitle){
            this._addAlert={
                title:false,
                employ:false
            }
            return this._addAlert={
                title:!this._addAlert.title,
                employ:!this._addAlert.employ
            }
        }
    }

    setInstrument(instrument: ToolType) {
        this._instrument = {
            ...this._instrument,...instrument
        };
    }

    get instrument() {
        return this._instrument;
    }

    setInstrumentTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== "") {
            this._instrumentTitle = event.target.value;
        } else {
            this._instrumentTitle = null;
        }
    }

    get instrumentTitle() {
        return this._instrumentTitle;
    }

    setSerialNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            this._serialNumber = Number(event.target.value);
        } else {
            this._serialNumber = null;
        }
    }

    get serialNumber() {
        return this._serialNumber;
    }

    setDiameter = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            this._diameter = Number(event.target.value);
        } else {
            this._diameter = null;
        }
    }

    get diameter() {
        return this._diameter;
    }

    setEmployeeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== "") {
            this._employeeName = event.target.value;
        } else {
            this._employeeName = null;
        }
    }

    get employeeName() {
        return this._employeeName;
    }

    saveButtonClick = () => {
        if(this._instrumentTitle !== null && this._employeeName !== null){
            this._addAlert.title = false;
            this._addAlert.employ = false;

            this.setInstrument({
                id: String(Date.now()),
                title: this._instrumentTitle,
                date:{
                    DMY:moment().format("DD.MM.YYYY"),
                    time: moment().format("hh:mm"),
                } ,
                attr: {
                    serialNumber: this._serialNumber !== null ? this._serialNumber : 0,
                    diameter: this._diameter !== null ? this._diameter : 0,
                },
                employeeName: this._employeeName,
                extradited: true,
            })

            if (this._instrument) {
               rootStore.tools.addTool(this._instrument);
            }

        } else if (!this._instrumentTitle && !this._employeeName) {
            this._addAlert.title = true;
            this._addAlert.employ = true;
            
        } else if (!this._instrumentTitle) {
            this._addAlert.title = true;
            this._addAlert.employ = false;
        }
        else if (!this._employeeName) {
            this._addAlert.employ = true;
            this._addAlert.title = false;
        } 
    }
    get addAlert(){
        return this._addAlert
    }

    destroy(): void {

    }
}