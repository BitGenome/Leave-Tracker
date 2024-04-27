import { Outlet } from 'react-router-dom';
import LeftMenu from '../LeftMenu/LeftMenu';

export default function MainLayout() {
  return (
    <section className="flex bg-slate-100">
      <div className="flex-none">
        <LeftMenu />
      </div>
      <div className="h-screen overflow-y-auto">
        <Outlet />
      </div>
    </section>
  );
}
