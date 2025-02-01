import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from './components/common/Layout';
import HomePage from './Pages/HomePage';
import NotFoundPage from "./Pages/NotFoundPage"
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import BookingPage from './Pages/RegisterPage';
import LoadingPage from './Pages/LoadingPage';
import { useAuthContext } from './hooks/useAuthContext';
function App() {
  const { user, appLoading } = useAuthContext()
  return (
    
    <>  <Routes>
  <Route path="/" element={<Layout className="pages"/>}>
<Route index element={<HomePage/>    } />
<Route path="booking" 
    element={
          appLoading ? (
        <LoadingPage />
          ) : user ? (
            <BookingPage />
          ) : (
            <Navigate to="/login" replace/>
          )
        }
/>
  </Route>
  <Route path="login" element={<LoginPage />} />
<Route path="register" element={<RegisterPage />} />
  <Route  path="*" element={<NotFoundPage/>}/>
</Routes>

    </>
  )
}

export default App
