import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin'; // Import Signin if not already imported
import Dashboard from './components/Dashboard'; // Import Dashboard if not already imported
import SendMoney from './components/SendMoney'; // Import SendMoney if not already imported

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendMoney" element={<SendMoney />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
