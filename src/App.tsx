import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ImageList from './pages/ImageList/ImageList';
import UploadImages from './pages/UploadImages/UploadImages';
import ImageDetailView from './pages/ImageDetailView/ImageDetailView';
import _ from 'lodash';
import { isUserLoggedin } from './utils/utils';

function App() {

  return (
    <main>
      {isUserLoggedin() ? <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ImageList />} />
          <Route path="/upload" element={<UploadImages />} />
          <Route path="/image-detail/:id" element={<ImageDetailView />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router> : <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>}

    </main>
  );
}

export default App;
