import {apiErrorReceived} from "../../store/error"
    
function project(history,error,store){

    if(error.response.data){
        store.dispatch({type:apiErrorReceived.type,payload:{data:error.response.data}})
    }
    return Promise.reject(error)

}
export default project