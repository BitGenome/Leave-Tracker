/* eslint-disable import/prefer-default-export */
import { channels } from '../../../main/channels/channels';
import { EmployeeAttributes } from '../../../main/models/employee';
import { Response } from '../../../main/types/response';

export async function fetchEmployeesService(): Promise<
  Response<EmployeeAttributes[] | undefined>
> {
  return window.electron.ipcRenderer.invoke(channels.EMPLOYEE_GET_ALL);
}
