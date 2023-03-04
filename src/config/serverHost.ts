export const serverHost = {
    host: "http://77.91.69.230:1000", // Базовый URL

    get toolModule() {
        return `${this.host}/tool`;
    },

    get allTools() {
        return `${this.toolModule}/tools`;
    },

    get returnedTools() {
        return `${this.toolModule}/returned-tools`;
    },

    get notReturnedTools() {
        return `${this.toolModule}/not-returned-tools`;
    },

    getTool(id: string) {
        return `${this.toolModule}/${id}`;
    },

    get insertTool() {
        return `${this.toolModule}/insert-tool`;
    },

    updateTool(id: string) {
        return `${this.toolModule}/${id}`;
    },

    deleteTool(id: string) {
        return `${this.toolModule}/${id}`;
    }
};