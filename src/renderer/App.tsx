import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './global.css';
import Main from './screen';
import MainLayout from './components/Layout/Main';
import { TooltipProvider } from './components/ui/tooltip';
import FileLeave from './screen/FileLeave';
import { ROUTES } from './constants/routes';
import Employees from './screen/Employees';
import LeaveReports from './screen/LeaveReports';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'tailwindcss/tailwind.css';

export default function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Main />} />
            <Route path={ROUTES.FILE_LEAVE} element={<FileLeave />} />
            <Route path={ROUTES.EMPLOYEES} element={<Employees />} />
            <Route path={ROUTES.LEAVE_REPORTS} element={<LeaveReports />} />
          </Route>
        </Routes>
      </Router>
    </TooltipProvider>
  );
}
