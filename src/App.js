import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.js'
import SignIn from './pages/signIn.js';
import SignUp from './pages/signUp.js';
import UserProfilePage from './pages/userProfilePage.js';
import ProtectedRoutes from './privateRoute.js';
import CompanyProfilePage from './pages/companyProfilePage.js';
import Profile from './pages/profile.js';
import Reviews from './pages/reviews.js';
import SearchResults from './pages/searchResults.js';
import CompanyPage from './pages/companyPage.js';
import NotFound from './pages/notFound.js';
import AddReview from './pages/addReview.js';
import AddReviewToUser from './pages/addReviewToUser.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/user-profile-page' element={<UserProfilePage />} />
          <Route path='/company-profile-page' element={<CompanyProfilePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/add-review' element={<AddReview />} />
        </Route>
        <Route path='/search/:query' element={<SearchResults />} />
        <Route path='/company/:companyName' element={<CompanyPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
