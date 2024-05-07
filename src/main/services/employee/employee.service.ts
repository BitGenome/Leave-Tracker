/* eslint-disable @typescript-eslint/no-unused-vars */
import { ipcMain as ipc } from 'electron';
import { channels } from '../../channels/channels';
import Employee from '../../models/employee';
import { Response } from '../../types/response';
import { RESPONSE } from '../../utils/response-code';

type EmployeeProps = {
  id: string;
  employee_id: string;
  firstname: string;
  lastname: string;
  position: string;
};

async function AddEmployeeHandler(
  _event: any,
  props: EmployeeProps,
): Promise<Response<any>> {
  const employeeResult = await Employee.create({
    firstname: props.firstname,
    lastname: props.lastname,
    employee_id: props.employee_id,
    position: props.position,
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

async function deleteEmployee(
  _event: any,
  props: Pick<EmployeeProps, 'id'>,
): Promise<Response<string>> {
  try {
    const result = await Employee.destroy({
      where: {
        id: props.id,
      },
    });

    return {
      code: RESPONSE.success.code,
      message: RESPONSE.success.message,
      data: 'Successfully deleted the employee',
    };
  } catch (error) {
    return {
      code: RESPONSE.server_error.code,
      message: RESPONSE.server_error.message,
      data: `Error: ${error}`,
    };
  }
}

async function EmployeeService() {
  ipc.handle(channels.EMPLOYEE_ADD, AddEmployeeHandler);
  ipc.handle(channels.EMPLOYEE_GET_ALL, getAllEmployee);
  ipc.handle(channels.EMPLOYEE_DELETE_BY_ID, deleteEmployee);
}

export default EmployeeService;
