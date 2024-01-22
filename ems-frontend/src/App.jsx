import './App.css'
import EmployeeList from './components/EmployeeList'
import Employee from './components/Employee'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'


function App() {
  
  return (
  <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<EmployeeList />}></Route>
        <Route path='/employees-list' element={<EmployeeList />}></Route>
        <Route path='/add-employee' element={<Employee />}></Route>
        <Route path='/update-employee/:id' element={<Employee />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </>
  )
}

export default App
