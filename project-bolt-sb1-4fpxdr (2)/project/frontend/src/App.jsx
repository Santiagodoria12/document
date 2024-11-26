import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ComponentCreator from './pages/ComponentCreator';
import WorkflowDesigner from './pages/WorkflowDesigner';
import OcrConfig from './pages/OcrConfig';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ComponentCreator />} />
            <Route path="/workflow" element={<WorkflowDesigner />} />
            <Route path="/ocr" element={<OcrConfig />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;