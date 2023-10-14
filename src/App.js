import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

import SignUp from './PatientComponents/Sign Up';
import SignIn from './PatientComponents/Sign In';
import Blog from './PatientComponents/Blogs';
import DoctorsList from './PatientComponents/DoctorsList';
import PatientChat from './PatientComponents/PatientChat';
import DoctorChat from './DoctorComponents/DoctorChat';
import RecentConversations from './ReusableComponents/RecentConversations';
import Playground from './PatientComponents/Playground';
import Query from './PatientComponents/Queries';
import SortByLocation from './ReusableComponents/SortByLocation';
import AddBlogs from './DoctorComponents/AddBlogs';
import Test from './DoctorComponents/Test';

function App(){
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SignUp />} />
        <Route exact path='/Sign In' element={<SignIn />} />
        <Route exact path='/Blogs' element={<Blog />} />
        <Route exact path='/Doctors List' element={<DoctorsList />} />
        <Route exact path='/Patient Chats/:user1/:user2' element={<PatientChat />} />
        <Route exact path='/Doctor Chats/:user1/:user2' element={<DoctorChat />} />
        <Route exact path='/Queries' element={<Query/>} />
        <Route exact path='/SortByLocation' element={<SortByLocation/>} />
        <Route exact path='/AddBlogs' element={<AddBlogs />} />
        <Route exact path='/Test' element={<Test />} />
        <Route exact path='/Playground' element={<Playground />} />
      </Routes>
    </Router>
  );
}

export default App;