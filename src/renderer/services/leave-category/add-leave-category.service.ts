import { channels } from '../../../main/channels/channels';
import { Response } from '../../../main/types/response';
import { type LeaveCategory } from '../../components/Dialog/AddLeaveCategory';

// eslint-disable-next-line import/prefer-default-export
export async function addLeaveCategoryService(
  values: LeaveCategory,
): Promise<Response<string>> {
  return window.electron.ipcRenderer.invoke(
    channels.LEAVE_CATEGORY_ADD,
    values,
  );
}
