import { ipcMain as ipc } from 'electron';
import { channels } from '../../channels/channels';
import LeaveCategory, {
  LeaveCategoryAttributes,
} from '../../models/leave-category';
import { type Response } from '../../types/response';
import { RESPONSE } from '../../utils/response-code';

type TLeaveCategory = {
  id?: string;
  category_name: string;
  accrual_rate?: number;
};

async function AddLeaveCategoryHandler(
  _event: any,
  props: TLeaveCategory,
): Promise<Response<string>> {
  const response = await LeaveCategory.create({
    name: props.category_name,
    accrual_rate: props.accrual_rate,
  });

  if (!response)
    return {
      code: RESPONSE.server_error.code,
      message: RESPONSE.server_error.message,
      data: 'Error. Please try again',
    };
  return {
    code: RESPONSE.success.code,
    message: RESPONSE.success.message,
    data: 'Success',
  };
}

async function getLeaveCategory(): Promise<
  Response<LeaveCategoryAttributes[] | string>
> {
  const response = await LeaveCategory.findAll({ raw: true });
  if (!response)
    return {
      code: RESPONSE.server_error.code,
      message: RESPONSE.server_error.message,
      data: 'Error',
    };
  return {
    code: RESPONSE.success.code,
    message: RESPONSE.success.message,
    data: response,
  };
}
async function LeaveCategoryService() {
  ipc.handle(channels.LEAVE_CATEGORY_ADD, AddLeaveCategoryHandler);
  ipc.handle(channels.LEAVE_CATEGORY_GET_ALL, getLeaveCategory);
}

export default LeaveCategoryService;
