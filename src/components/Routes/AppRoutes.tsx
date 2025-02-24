import History from '../History';
import {Route, Routes} from 'react-router-dom';
import Template from '@/pages/templates/Template';
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Template/>}></Route>
        <Route path='History' element={<History />}></Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
