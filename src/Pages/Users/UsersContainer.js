import React from 'react'
import Users from './Users'



const initUser = {
    username:'',
    email:'',
    role:{
        name:'',
        products:false,
        stock:false,
        orders:false,
        purchases:false
    }
}

const reducer = (state,action)=>{
    switch (action.type) {
        case 'username':
            return { ...state,username:action.value}
            case 'email':
                return { ...state,email:action.value}
                case 'name':
                    return { ...state,role:{...state.role,name:action.value}}
                    case 'products':
                        return { ...state,role:{...state.role,products:action.value}}
                        case 'stock':
                            return { ...state,role:{...state.role,stock:action.value}}
                            case 'orders':
                                return { ...state,role:{...state.role,orders:action.value}}
                                case 'purchases':
                                    return { ...state,role:{...state.role,purchases:action.value}}
    
        default:
            return state
    }
}
function UsersContainer() {
    const [toggled, settoggled] = React.useState(false);
    const [selectedRole, setselectedRole] = React.useState('');
    const [newRole, setnewRole] = React.useState(false);

    const [user, dispatch] = React.useReducer(reducer, initUser)


    const handleToggled = (event)=>{
        settoggled(event.target.checked)
    };

    const handleDropDownRoleChange = (event) => {
        setselectedRole(event.target.value);
      };


      console.log('USER::::',user)
    return (
        <Users handleToggled={handleToggled} toggled={toggled} handleDropDownRoleChange={handleDropDownRoleChange} selectedRole={selectedRole} roles={[]} isNewRole={newRole} userDispatcher={dispatch} user={user} />
    )
}

export default UsersContainer
