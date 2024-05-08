/* eslint-disable import/prefer-default-export */
import { channels } from '../../../main/channels/channels';
import { Response } from '../../../main/types/response';
// eslint-disable-next-line import/no-cycle
import { TAddEmployee } from '../../components/Dialog/AddEmployee';

export async function addEmployeeService(
  values: TAddEmployee,
): Promise<Response<string>> {
  return window.electron.ipcRenderer.invoke(channels.EMPLOYEE_ADD, values);
}
