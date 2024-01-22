import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteEmployee } from '../services/EmployeeService';
import { listEmployees } from '../services/EmployeeService';


function EmployeeList() {

const [employees, setEmployees] = useState([]);

const navigate = useNavigate();

useEffect(()=>{
    getAllEmployees();
},[])

function getAllEmployees(){
    listEmployees().then((response)=>{
        setEmployees(response.data);
    }).catch(error=>{
        console.error(error);
    })
}


function addNewEmployee(){
    navigate('/add-employee')  
}

function updateEmployee(id){
   navigate(`/update-employee/${id}`)

}

function removeEmployee(id){
	console.log(id);
    deleteEmployee(id).then((response)=>{
        getAllEmployees();

    }).catch(error=>{
        console.log(error);
    })
}


  return (
 
    <div className='fixed container mt-20'>
        <h2 className='text-center font-bold text-xl text-gray-700 '>List of Employees</h2>
        <button className='btn text-center rounded-md w-40 text-sm bg-blue-700 py-3 rounded-md text-white md:border-2 hover:bg-blue-500 hover:text-white transition ease-out duration-500 ml-8 lg:ml-8 sm:ml-0 md:ml-0' onClick={addNewEmployee}>
        Add New Employee</button>
        <div className="overflow-y-auto h-80 w-full flex justify-center">
        <table className='table-auto h-80 border-collapse border border-slate-400  mt-1 h-60 '>
        <thead className=''>
        <tr className=''>
            <th className='p-3 text-sm font-semibold border border-slate-300 bg-gray-100 w-60 h-10 text-left'>Employee ID</th>
            <th className='p-3 text-sm font-semibold border border-slate-300 bg-gray-100 w-60 h-10 text-left'>First Name</th>
 <th className='p-3 text-sm font-semibold border border-slate-300 bg-gray-100 w-60 h-10 text-left'>Last Name</th>
 <th className='p-3 text-sm font-semibold border border-slate-300 bg-gray-100 w-60 h-10 text-left'>Email</th>
 <th className='p-3 text-sm font-semibold border border-slate-300 bg-gray-100 w-60 h-10 text-left'>Actions</th>
 </tr>
 </thead>
 <tbody>
 {
 employees.map(employee =>
 <tr key={employee.id}>
 <td className='border border-slate-300 w-60 h-10 text-sm text-gray-500 pl-3'>{employee.id}</td>
 <td className='border border-slate-300 w-60 h-10 text-sm text-gray-500 pl-3'>{employee.firstName}</td>
 <td className='border border-slate-300 w-60 h-10 text-sm text-gray-500 pl-3'>{employee.lastName}</td>
 <td className='border border-slate-300 w-60 h-10 text-sm text-gray-500 pl-3'>{employee.email}</td>
 <td className='flex items-center'>
 <button className='btn rounded-md w-16 text-sm mt-1 bg-blue-600 py-3 rounded-md text-white md:border-2 hover:bg-blue-400 hover:text-white transition ease-out duration-500' onClick={()=>updateEmployee(employee.id)}>Update</button>
 <button className='btn rounded-md w-16 text-sm mt-1 bg-red-600 py-3 rounded-md text-white md:border-2 hover:bg-red-400 hover:text-white transition ease-out duration-500' onClick={()=> removeEmployee(employee.id)} style={{marginLeft:'10px'}}>Delete</button>
 </td>
 </tr>
 )
 }

 </tbody>
</table>
</div>
</div>
 

  )
}

export default EmployeeList