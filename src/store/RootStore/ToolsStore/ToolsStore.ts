import { makeObservable, observable, action, computed, runInAction, toJS } from "mobx";
import axios from "axios";
import { normalizeToolItem } from "../models/ToolItem/ToolItem";
import { serverHost } from "../../../config/serverHost";

export type ToolType = {
    id: string;
    title: string;
    date:{
        DMY:string,
        time: string,
    } 
    attr?: {
        serialNumber?: number | null;
        diameter?: number | null;
    },
    employeeName: string;
    extradited: boolean,
}

type PrivateFields = "_tools" | "_returnedTools" | "_notReturnedTools";

export default class ToolsStore {
    private _tools: ToolType[] | null = null;
    private _returnedTools: ToolType[] | null = null;
    private _notReturnedTools: ToolType[] | null = null;

    constructor() {
        makeObservable<ToolsStore, PrivateFields>(this, {
            _tools: observable,
            setTools: action,
            tools: computed,
            _returnedTools: observable,
            setReturnedTools: action,
            returnedTools: computed,
            _notReturnedTools: observable,
            setNotReturnedTools: action,
            notReturnedTools: computed
        });
    }

    setTools(tools: ToolType[] | null) {
        this._tools = tools;
    }

    get tools() {
        return this._tools;
    }

    setReturnedTools(returnedTools: ToolType[] | null) {
        this._returnedTools = returnedTools;
    }

    get returnedTools() {
        return this._returnedTools;
    }

    setNotReturnedTools(notReturnedTools: ToolType[] | null) {
        this._notReturnedTools = notReturnedTools;
    }

    get notReturnedTools() {
        return this._notReturnedTools;
    }

    async getAllTools() {
        const result =  await axios.get(serverHost.allTools)

        runInAction(() => {
            this.setTools(result.data);
        })
    }

    async addTool(tool: ToolType) {
        
        const result = await axios({
            method: "post",
            url: serverHost.insertTool,
            data: {
                "tool": tool
            },
        });

        if(result.status === 201){
            this.getAllTools()
            this.getReturnedTools()
            this.getNotReturnedTools()
        }

    }

    async getReturnedTools() {
        const result =  await axios.get(serverHost.returnedTools)

        runInAction(() => {
            this.setReturnedTools(result.data);
        })
    }

    async getNotReturnedTools() {
        const result =  await axios.get(serverHost.notReturnedTools)

        runInAction(() => {
            this.setNotReturnedTools(result.data);
        })
    }

    async updateTool(id: string, extradited: boolean) {

        const result = await axios({
            method: "put",
            url: serverHost.updateTool(id),
            data: {
                "extradited": extradited
            }
        })

        runInAction(() => {
            this.getReturnedTools();
            this.getNotReturnedTools();
        })
    }

   async deleteTool(id: string) {
        const result = await axios({
            method: "delete",
            url: serverHost.deleteTool(id),
            data: {
                "id": id,
            }
        })

        runInAction(() => {
            this.getReturnedTools();
            this.getNotReturnedTools();
        })
    }
}