import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ImageList from './pages/ImageList/ImageList';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<ImageList/>} />
          {/* <PrivateRoute path="/upload" component={UploadImage} />
          <PrivateRoute path="/images" component={ImageList} />
          <PrivateRoute path="/image/:id" component={ImageDetails} /> */}
          <Route  path="*" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
