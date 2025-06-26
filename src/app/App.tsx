import '../common/styles/color-schema.css'
import '../common/styles/typography.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SideBar from '../common/components/side-bar/side-bar'
import Login from '../pages/login/login'
import { useMyDispatch } from '../hooks/my-dispatch';
import { useEffect } from 'react';
import { initSession } from '../features/domain/redux/slices/user-sessions-slice';

function App() {

  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(initSession())
  }, [dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<>
          <Link to="/login">login</Link>
          <SideBar/>
          </>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
