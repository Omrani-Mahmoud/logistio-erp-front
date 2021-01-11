import React from 'react'
import useToken from '../../Hooks/useToken'
import Users from './Users'
import axios  from 'axios'
import {uri} from "../../Url_base";


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
    const [setToken,getToken] = useToken();
    const [roles, setroles] = React.useState([])

    const handleToggled = (event)=>{
        settoggled(event.target.checked)
    };

    const handleDropDownRoleChange = (event) => {
        setselectedRole(event.target.value);
      };


      React.useEffect(() => {
        console.log('HERE FETCH ROLES')
        let mounted = true;

    axios.get(`${uri.link}/roles/`,{
        headers:{'auth-token':`${getToken()}`}
    })
       .then(function (response) {
           if(mounted){
                console.log(response);
                setroles(response.data)
                
           }
       })
       .catch(function (error) {
           // handle error
           console.log(error);
       });
       return ()=>{
           mounted=false
       }
    }, [])


   const  _saveuser = ()=>{
        let role ;
        let userToSend ;
        let sections = [];
            user?.role.products && sections.push({name:'product',access:['c','r','u','d']})
            user?.role.stock && sections.push({name:'stock',access:['c','r','u','d']})
            user?.role.orders && sections.push({name:'orders',access:['c','r','u','d']})
            user?.role.purchases && sections.push({name:'purchases',access:['c','r','u','d']})

        role={
                name:user?.role.name,
                sections:sections
            }

       if(selectedRole===''){
        userToSend = {
            
                username:user.username,
                email:user.email,
                role:role
            }
       }
       else {
        userToSend = {
            
            username:user.username,
            email:user.email,
            role:{
                _id:selectedRole
            }
        }
       }
        axios.post(`${uri.link}/users/`, userToSend,{
            headers:{'auth-token':`${getToken()}`}
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log('to send :::: ',userToSend)
    }

    return (
        <Users handleToggled={handleToggled} toggled={toggled} handleDropDownRoleChange={handleDropDownRoleChange} selectedRole={selectedRole} roles={roles} isNewRole={newRole} userDispatcher={dispatch} user={user} saveUser = {_saveuser} />
    )
}

export default UsersContainer
