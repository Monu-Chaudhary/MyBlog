import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavigationBar from './Navigation';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar/>
        <div id='page-body'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/article-list' element={<ArticlesListPage />} />
            <Route path='/article/:articleId' element={<ArticlePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signUp' element={<SignupPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
