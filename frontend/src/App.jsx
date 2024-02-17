import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import Signup from './pages/Signup';
import Signin from './pages/Signin'; 
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney'; 

function App() {
  return (
    <div>

      <Router>
      <Analytics />

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendMoney" element={<SendMoney />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
