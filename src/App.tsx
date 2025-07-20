import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/DashBoard'
import ContractAnalysisPage from './pages/ContractAnalysis'

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contract-analysis" element={<ContractAnalysisPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
