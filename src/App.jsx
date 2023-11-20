import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import ChangePassword from './Components/Authentication/ChangePassword';
import HomePage from './Components/UserComponents/UserHomePage';
import Login from './Components/Authentication/Login';
import PasswordRecovery from './Components/Authentication/PasswordRecovery';
import { useEffect, useState } from 'react';
import UserHomePage from './Components/UserComponents/UserHomePage';
import AdminHomePage from './Components/AdminComponents/AdminHomePage';
import CreateUser from './Components/AdminComponents/CreateUser';
import ContainerPage from './Components/UserComponents/ContainerPage';
import UserPage from './Components/AdminComponents/UserPage';
import UserUpdatePage from './Components/AdminComponents/UserUpdatePage';
import ArchivedUsers from './Components/AdminComponents/ArchivedUsers';
import ArchivedUserPage from './Components/AdminComponents/ArchivedUserPage';
import ArchivedContainers from './Components/UserComponents/ArchivedContainers';
import ArchivedContainerPage from './Components/UserComponents/ArchivedContainerPage';
import RouteHandler from './Components/RouteHandler';

function App() {

  const [authToken, setAuthToken] = useState(0)

  return (
    <div>
    <Router>
      
      <Routes>

        {!localStorage.getItem("authenticationToken") && <Route path='/login' element={<Login />}></Route>}
        {!localStorage.getItem("authenticationToken") && <Route path='/password-recovery' element={<PasswordRecovery />}></Route>}
        {!localStorage.getItem("authenticationToken") && <Route path='/change-password/:jwt' element={<ChangePassword />}></Route>}

        {localStorage.getItem("authenticationToken") && localStorage.getItem("user-role")==="USER" && <Route path='/user-home-page' element={<UserHomePage />}></Route>}
        {localStorage.getItem("authenticationToken") && localStorage.getItem("user-role")==="USER" && <Route path='/container-page/:id' element={<ContainerPage />}></Route>}
        {localStorage.getItem("authenticationToken") && localStorage.getItem("user-role")==="USER" && <Route path='/archived-container-page' element={<ArchivedContainers />}></Route>}
        {localStorage.getItem("authenticationToken") && localStorage.getItem("user-role")==="USER" && <Route path='/archived-container-page/:id' element={<ArchivedContainerPage />}></Route>}


        {localStorage.getItem("authenticationToken") && localStorage.getItem("user-role")==="ADMIN" && <Route path='/admin-home-page' element={<AdminHomePage />}></Route>}
        {localStorage.getItem("authenticationToken") && localStorage.getItem("user-role")==="ADMIN" && <Route path='/create-user' element={<CreateUser />}></Route>}
        {localStorage.getItem("authenticationToken") && localStorage.getItem("user-role")==="ADMIN" && <Route path='/user-page/:id' element={<UserPage />}></Route>}
        {localStorage.getItem("authenticationToken") && localStorage.getItem("user-role")==="ADMIN" && <Route path='/user-update-page/:id' element={<UserUpdatePage />}></Route>}
        {localStorage.getItem("authenticationToken") && localStorage.getItem("user-role")==="ADMIN" && <Route path='/archived-users' element={<ArchivedUsers />}></Route>}
        {localStorage.getItem("authenticationToken") && localStorage.getItem("user-role")==="ADMIN" && <Route path='/archived-user-page/:id' element={<ArchivedUserPage />}></Route>}

        <Route path='/*' element={<RouteHandler />}></Route>


        {/* {!localStorage.getItem("authenticationToken") && <Route path='/login' element={<Login />}></Route>}
        {!localStorage.getItem("authenticationToken") && <Route path='/password-recovery' element={<PasswordRecovery />}></Route>}
        {!localStorage.getItem("authenticationToken") && <Route path='/change-password/:jwt' element={<ChangePassword />}></Route>}

        <Route path='/user-home-page' element={<UserHomePage />}></Route>
        <Route path='/container-page/:id' element={<ContainerPage />}></Route>
        <Route path='/archived-container-page' element={<ArchivedContainers />}></Route>
        <Route path='/archived-container-page/:id' element={<ArchivedContainerPage />}></Route>


        <Route path='/admin-home-page' element={<AdminHomePage />}></Route>
        <Route path='/create-user' element={<CreateUser />}></Route>
        <Route path='/user-page/:id' element={<UserPage />}></Route>
        <Route path='/user-update-page/:id' element={<UserUpdatePage />}></Route>
        <Route path='/archived-users' element={<ArchivedUsers />}></Route>
        <Route path='/archived-user-page/:id' element={<ArchivedUserPage />}></Route>

        <Route path='/*' element={<RouteHandler />}></Route> */}

      </Routes>
    </Router>
  </div>
       
  )
}

export default App
