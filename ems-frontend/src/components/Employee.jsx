import React, {useState, useEffect} from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom' 

const Employee = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

     const [errors,setErrors] = useState({
        firstName:'', 
        lastName:'', 
        email:''
    })  

    const navigate = useNavigate();

    const {id} = useParams(); 

    function saveOrUpdateEmployee(e){
        e.preventDefault();
        
        if(validateForm()){

            const employee = {firstName, lastName, email};
            console.log(employee);

            if(id){
                updateEmployee(id, employee).then((response) =>{
                    console.log(response.data);
                    navigate('/employees-list');
                }).catch((error) =>{
                    console.log(error);
                })
                
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees-list')
                }).catch(error=>{
                    console.log(error);
            }) 
            }
        }

    }

    function changePageTitle(){

        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }

    } 



    function validateForm(){

        let valid = true;
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const errorsCopied = {... errors};

        if(firstName.trim()){
            errorsCopied.firstName ='';
        }else{
            errorsCopied.firstName = 'First name is required.'
            valid = false;
        }

        if(lastName.trim()){
            errorsCopied.lastName ='';
        }else{
            errorsCopied.lastName = 'Last name is required.'
            valid = false;
        }

        if(email.trim().match(regex)){
            errorsCopied.email ='';
        }else{
            errorsCopied.email = 'Email is required.'
            valid = false;
        }

        setErrors(errorsCopied);

        return valid;

    
    }


     useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
    }).catch(error=>{
    console.log(error);
    })
    }
    
    },[id])

  return (
    <div className='position-relative'>
        <div className='flex items-center justify-center mt-16'>
            <form className=' border-gray-300 shadow-lg rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg' noValidate>
                <div className='position-relative font-bold text-xl'>
                        {
                        changePageTitle()
                        }
                        </div>
                        <div className=''>
                            <label className=''>First Name</label>
                            <input type='text'

                             className="w-full rounded border border-gray-300 p-3 shadow shadow-gray-100  outline-none text-neutral-800 peer"
                             placeholder='Enter First Name'
                             name='firstName'
                             value={firstName}
                             required
                             onChange={(e)=>setFirstName(e.target.value)}
                             >   
                             </input>

                             {errors.firstName && <p className="invisible peer-invalid:visible text-red-700 font-light">Please enter first name</p>}
                             
                             <label className='form-label'>Last Name</label>
                            <input type='text'
                             className='w-full rounded border border-gray-300 p-3 shadow shadow-gray-100  outline-none text-neutral-800 peer'
                             placeholder='Enter Last Name'
                             name='lastName'
                             value={lastName}
                             required
                             onChange={(e)=>setLastName(e.target.value)}
                             >   
                             </input>
                             {errors.lastName && <p className="invisible peer-invalid:visible text-red-700 font-light">Please enter last name</p>}      
                             
                             <label className='form-label'>Email</label>
                             <input type='email'
                            className='w-full rounded border border-gray-300 p-3 shadow shadow-gray-100  outline-none text-neutral-800 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400'
                            required 
                            placeholder='Enter Email'
                             name="email"
                             value={email}
                             onChange={(e)=>setEmail(e.target.value)}
                             >   
                             </input>
                             <span className="mt-1 hidden text-sm text-red-400">
                                    Please enter a valid email address.{' '}
                                </span>
                             {errors.email && <p className="invisible peer-invalid:visible text-red-700 font-light">Please enter email</p>}
                        </div>
                        <button className='btn rounded-md w-20 text-sm mt-1 bg-blue-700 py-3 rounded-md text-white md:border-2 hover:bg-blue-500 hover:text-white transition ease-out duration-500' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
    </div>
  )
}

export default Employee