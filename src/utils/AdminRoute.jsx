import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {

    const {token} = useSelector((store)=>store.auth)
    const {user} = useSelector((store)=>store.profile)
    if(token !== 'null' && user?.accountType=='Admin'){
        return children
    }
    return <Navigate to="/" replace/>

}

export default AdminRoute