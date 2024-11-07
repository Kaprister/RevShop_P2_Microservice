import {useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'



// eslint-disable-next-line react/prop-types
function PrivateRoute({children}) {

    const {revShopUser} = useSelector(state => state.auth);
    // console.log(userInfo);


    if(revShopUser){
        return children
    }else{
        return <Navigate to="/login" />
    }

}

export default PrivateRoute
