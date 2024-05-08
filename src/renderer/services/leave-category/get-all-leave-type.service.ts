/* eslint-disable import/prefer-default-export */
import { channels } from '../../../main/channels/channels';
import { LeaveCategoryAttributes } from '../../../main/models/leave-category';
import { Response } from '../../../main/types/response';

export async function fetchLeaveTypeService(): Promise<
  Response<LeaveCategoryAttributes[] | undefined>
> {
  return window.electron.ipcRenderer.invoke(channels.LEAVE_CATEGORY_GET_ALL);
}
