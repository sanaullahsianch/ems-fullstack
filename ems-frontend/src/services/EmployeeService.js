import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const listEmployees = ()=> axios.get(BASE_URL+'/get-all-employees'); 

export const createEmployee = (employee)=> axios.post(BASE_URL+'/save-employee', employee);

export const getEmployee = (employeeId) => axios.get(BASE_URL+'/get-employee/'+employeeId);

export const updateEmployee = (employeeId, employee) => axios.put(BASE_URL+'/update-employee/'+employeeId, employee);

export const deleteEmployee = (employeeId) => axios.delete(BASE_URL+ '/delete-employee/' +employeeId);