import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SubmitProgram } from './pages/SubmitProgram';
import { SubmitConfirmation } from './pages/SubmitConfirmation';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SubmitProgram />} />
        <Route path="/confirmation" element={<SubmitConfirmation />} />
      </Routes>
    </Layout>
  );
}

export default App;
