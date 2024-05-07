import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './components/Layout/Main';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { ROUTES } from './constants/routes';
import './global.css';
import Main from './screen';
import Employees from './screen/Employees';
import FileLeave from './screen/FileLeave';
import LeaveCategory from './screen/LeaveCategory';
import LeaveReports from './screen/LeaveReports';
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
            <Route path={ROUTES.LEAVE_CATEGORY} element={<LeaveCategory />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </TooltipProvider>
  );
}
