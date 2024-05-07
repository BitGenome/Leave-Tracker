import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';
import AddLeaveCategory from '../../components/Dialog/AddLeaveCategory';

export default function LeaveCategory() {
  return (
    <div className="w-full">
      <div className="border-b p-5 h-20 ">
        <div className="flex justify-between">
          <h2 className="scroll-m-20 pb-2 text-xl font-bold  first:mt-0">
            Leave Category
          </h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2" />
                New leave category
              </Button>
            </DialogTrigger>
            <AddLeaveCategory />
          </Dialog>
        </div>
      </div>
    </div>
  );
}
