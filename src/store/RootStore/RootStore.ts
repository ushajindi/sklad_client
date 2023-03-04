// import QueryParamsStore from "./QueryParamsStore";
import ToolsStore from "./ToolsStore/ToolsStore";

export default class RootStore {
//   readonly query = new QueryParamsStore();
    readonly tools = new ToolsStore();
}