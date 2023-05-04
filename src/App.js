import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header/header.jsx'
import ContactList from './pages/contactList/contactList.jsx';
import NewContact from './pages/newContact/newContact.jsx';
import EditContact from './pages/editContact/editContact.jsx';
import NotFound from './pages/notFound/norFound.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';

function App() {
  return (
    <div className='wrapper'>
      <Router basename="/contact-list-react">
        <Header></Header>
        <main className='main-block'>
          <Sidebar></Sidebar>
          <div className='main-block__content-block'>
            <Routes>
              <Route path='/' element={<ContactList/>}/>
              <Route path='/new-contact' element={<NewContact/>}/>
              <Route path='/edit-contact' element={<EditContact/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
          </div>
        </main>
       
      </Router>
    </div>
  );
}

export default App;
