import { ipcMain as ipc } from 'electron';
import { channels } from '../../channels/channels';
import LeaveCategory from '../../models/leave-category';
import { type Response } from '../../types/response';
import { RESPONSE } from '../../utils/response-code';

type TLeaveCategory = {
  category_name: string;
};

async function AddLeaveCategoryHandler(
  _event: any,
  props: TLeaveCategory,
): Promise<Response<string>> {
  const response = await LeaveCategory.create({
    name: props.category_name,
  });
  console.log('response', response);
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
async function LeaveCategoryService() {
  ipc.handle(channels.LEAVE_CATEGORY_ADD, AddLeaveCategoryHandler);
}

export default LeaveCategoryService;
