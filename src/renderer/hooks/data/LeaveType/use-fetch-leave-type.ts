/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/prefer-default-export */
import { useCallback, useEffect, useState } from 'react';
import { LeaveCategoryAttributes } from '../../../../main/models/leave-category';
import { fetchLeaveTypeService } from '../../../services/leave-category/get-all-leave-type.service';

export const usefetchLeaveType = () => {
  const [leaveType, setLeaveType] = useState<
    LeaveCategoryAttributes[] | undefined
  >([]);

  async function fetchLeaveType() {
    try {
      const result = await fetchLeaveTypeService();
      setLeaveType(result.data);
    } catch (error) {
      setLeaveType(undefined);
      throw new Error(error as any);
    }
  }
  const fetchData = useCallback(() => {
    fetchLeaveType();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { leaveType };
};
