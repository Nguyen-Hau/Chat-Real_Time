import {BrowserRouter, Route, Routes} from 'react-router';
import { SignAppPage } from './pages/SignAppPage';
import { SignUpPage } from './pages/SignUpPage';
import {SignInPage} from './pages/SignInPage';
import {Toaster} from 'sonner';

function App() {

  return (
  <>
  <Toaster richColors/>
    <BrowserRouter>
      <Routes>
        // 
        <Route path = '/signin' element={<SignInPage/>} />
        <Route path = '/signup' element={<SignUpPage/>} />
        
        //
        <Route path = '/' element={<SignAppPage/>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
