/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { addLeaveCategoryService } from '../../services/leave-category/add-leave-category.service';

const categorySchema = z.object({
  category_name: z.string().min(1, {
    message: 'Employee id must be at least 1 characters.',
  }),
});

export type LeaveCategory = z.infer<typeof categorySchema>;

export default function AddLeaveCategory() {
  const form = useForm<LeaveCategory>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: '',
    },
  });
  async function onSubmit(values: LeaveCategory) {
    const response = await addLeaveCategoryService(values);
    console.log('response', response);
  }
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>New Leave Category</DialogTitle>
        <DialogDescription>
          Add here the employee leaves category.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="category_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
