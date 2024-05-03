/* eslint-disable @typescript-eslint/no-unused-vars */
import { ipcMain as ipc } from 'electron';
import { channels } from '../../channels/channels';
import Employee from '../../models/employee';
import { Response } from '../../types/response';
import { RESPONSE } from '../../utils/response-code';

type EmployeeProps = {
  employee_id: string;
  firstname: string;
  lastname: string;
};

async function AddEmployeeHandler(
  _event: any,
  props: EmployeeProps,
): Promise<Response<any>> {
  const employeeResult = await Employee.create({
    firstname: props.firstname,
    lastname: props.lastname,
    employee_id: props.employee_id,
  });

  if (!employeeResult)
    return {
      code: RESPONSE.server_error.code,
      message: RESPONSE.server_error.message,
      data: 'Something went wrong',
    };

  return {
    code: RESPONSE.success.code,
    message: RESPONSE.success.message,
    data: 'Success',
  };
}

async function getAllEmployee(): Promise<Response<EmployeeProps[] | string>> {
  const employeeData = await Employee.findAll({ raw: true });
  if (!employeeData || employeeData.length === 0)
    return {
      code: RESPONSE.server_error.code,
      message: RESPONSE.server_error.message,
      data: 'Employees not found',
    };
  return {
    code: RESPONSE.success.code,
    message: RESPONSE.success.message,
    data: employeeData,
  };
}

async function EmployeeService() {
  ipc.handle(channels.EMPLOYEE_ADD, AddEmployeeHandler);
  ipc.handle(channels.EMPLOYEE_GET_ALL, getAllEmployee);
}

export default EmployeeService;
