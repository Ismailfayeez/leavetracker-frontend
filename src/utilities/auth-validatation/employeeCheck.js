import Loading from "../../common/components/Loading"
import AccessDenied from "../../ui-kit/AccessDenied"

export const employeeCheck=(Component,employeeData)=>{

    if (employeeData.isLoading) return <Loading/>
    if (employeeData.id) return <Component/>
    return <AccessDenied/>
}