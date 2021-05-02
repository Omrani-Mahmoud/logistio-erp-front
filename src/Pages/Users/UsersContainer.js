// all the logique neeeded for users
// api calls ect
// even states


import React from 'react'
import useToken from '../../Hooks/useToken'
import Users from './Users'
import axios  from 'axios'
import {uri} from "../../Url_base";
import {motion} from 'framer-motion'


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
    const contentVariant = {
        hidden:{
            scale:0,
        },
        visible:{
            scale:1,
            transition:{
                type:'tween',
                duration:0.4,  
            }
        },   
    }
    const [toggled, settoggled] = React.useState(false);
    const [selectedRole, setselectedRole] = React.useState('');
    const [newRole, setnewRole] = React.useState(false);
    const [status, setStatus] = React.useState('');

    const [user, dispatch] = React.useReducer(reducer, initUser)
    const [setToken,getToken] = useToken();
    const [roles, setroles] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    const [loading, setLoading] = React.useState(false)
    const handleToggled = (event)=>{
        settoggled(event.target.checked)
    };

    const handleDropDownRoleChange = (event) => {
        setselectedRole(event.target.value);
      };

      const resetSelectedRole = ()=>{
          setselectedRole('')
      }


    //******* MISSING REFETCH ROLES AFTER ADD **********/
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
        setStatus('');
        setLoading(true);
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
            setLoading(false);
                if(response.status===200){
                    setStatus(200)
                }
                else{
                    setStatus('error')
                }
        })
        .catch(function (error) {
            setLoading(false);
            setStatus('error')
        });

 
    }

    React.useEffect(() => {
        let mounted = true;
    axios.get(`${uri.link}/users/`,{
        headers:{'auth-token':`${getToken()}`}
    })
       .then(function (response) {
           if(mounted){
                console.log('USERS ------------------>',response);
                let filtred  = response.data.filter(user=>{
                       return  user.is_deleted === false
                })
                setUsers(filtred)
                
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

    return (
        <motion.div variants={contentVariant} initial='hidden' animate='visible'>
            <Users loading={loading} status={status} usersList={users} handleToggled={handleToggled} toggled={toggled} handleDropDownRoleChange={handleDropDownRoleChange} selectedRole={selectedRole} roles={roles} isNewRole={newRole} userDispatcher={dispatch} user={user} saveUser = {_saveuser} resetSelectedRole={resetSelectedRole} />
        </motion.div>
    )
}

export default UsersContainer
