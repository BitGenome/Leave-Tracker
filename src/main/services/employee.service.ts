/* eslint-disable @typescript-eslint/no-unused-vars */
import { ipcMain as ipc } from 'electron';
import { channels } from '../channels/channels';

async function AddEmployee(_event: any, props: any) {
  console.log('props', props);
  return {
    data: 'hello',
  };
}

async function EmployeeService() {
  ipc.handle(channels.EMPLOYEE_ADD, AddEmployee);
}

export default EmployeeService;
