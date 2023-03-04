export type toolItemApi = {
    id: string;
    title: string;
    date: {
        DMY: string,
        time: string,
    }
    attr?: {
        serial_number?: number;
        diameter?: number;
    },
    employee_name: string;
    extradited: boolean
}

export type toolsItemModel = {
    id: string;
    title: string;
    date: {
        DMY:string;
        time:string;
    }
    attr?: {
        serialNumber?: number;
        diameter?: number;
    },
    employeeName: string;
    extradited: boolean
}

export const normalizeToolItem = (from: toolItemApi): toolsItemModel => {
    return {
        id: from.id,
        title: from.title,
        date: {
            DMY:from.date.DMY,
            time:from.date.time,
        },
        attr: {
            serialNumber: from?.attr?.serial_number,
            diameter: from?.attr?.diameter,
        },
        employeeName: from.employee_name,
        extradited: from.extradited
    }
};