import React, { useState } from 'react';
import './App.css';
import { loadUsers, getUser} from './sdk';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] : any = useState();
  const [login, setLogin] = useState(false);
  const [meetingToken, setMeetingToken] = useState('');
  const [email, setEmail] = useState('');
  const [userNames, setUserNames] = useState([]);
  //Below manages a simple login functionality to display two different users. I called the getUser function passing in the current value of the user object, which is tied to a Hook and modified via the useState object.
  function signIn(e: any) {
    console.log(user);
    getUser(user).then(data => {
      setUser(data.userName);
      setMeetingToken(data.meetingToken);
      setEmail(data.email);
      if (data.userName != null) {
        setLogin(true);
      }
    });
  
  }

  function logOut(){
    setUser(null);
    setLogin(false);
    setMeetingToken('');
    setEmail('');
  }


  return (
    <div className="site-container">
      {/*Below I check to see if login is false. If it is, I conditionally render the login functionality.*/}
      {!login &&
        <section className="login container p-4">

          <div className="form-group">
            <input className="form-control" placeholder="Type 'User123' || 'User345' || User567" type="text" name="name"
              onChange={e => setUser(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary" type="submit" onClick={() => signIn(user)}>Sign In</button>
            <button className="btn btn-warning" onClick={() => loadUsers()}>Load Sample Users</button>
          </div>
          
        </section>
      }
      {/*Below I check to see if the state of login is true and conditionally render the dashboard components.*/}
      { login &&
        <section className="dashboard">
           
          <header className="text-right bg-dark p-2 text-center text-white">
          <h1>Welcome to APPT {user}!<button className="btn btn-primary m-2" type="submit" onClick={() => logOut()}>Sign Out</button></h1>
          
          </header>
         
          <main>
          <Dashboard  user={user} meetingToken={meetingToken}/>
          </main>
        </section>
      }
    </div>
  );
}

export default App;
