import '../common/styles/color-schema.css'
import '../common/styles/typography.css'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SideBar from '../common/components/side-bar/side-bar'
import Login from '../pages/login/login'
import { useMyDispatch } from '../hooks/my-dispatch';
import { useEffect, useState } from 'react';
import { initSession } from '../features/domain/redux/slices/user-sessions-slice';
import { StrangeHeader } from '../common/components/header/strange-header';
import PageNotFount from '../pages/not-found';

function App() {

  const dispatch = useMyDispatch(); 

  useEffect(() => {
    dispatch(initSession())
  }, [dispatch])

  return (
    <>
      <Router>
        <Routes>
          
          <Route element={<SideBar/>}>
            <Route path='profile'/>

            <Route path='admin'>
                <Route index></Route>
                <Route path='users'></Route>
                <Route path='usefulservices'></Route>
                <Route path='events'></Route>
            </Route>

          <Route path='usefulservices'></Route>

          <Route path='certificates'></Route>

          <Route path='events'></Route>
          
          </Route>
          
          <Route path='login' element={<Login/>}/>
          
          <Route path='internal-error' element={"Error 500"}></Route>

          <Route path='*' element={<PageNotFount/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
