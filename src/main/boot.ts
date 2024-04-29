import EmployeeService from './services/employee.service';

/* eslint-disable import/prefer-default-export */
export async function boot() {
  await EmployeeService();
}
