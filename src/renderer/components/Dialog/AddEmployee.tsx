/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { Button } from '../ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { channels } from '../../../main/channels/channels';

const formSchema = z.object({
  id: z.string().min(1, {
    message: 'Employee id must be at least 1 characters.',
  }),
  firstname: z.string().min(1, {
    message: 'Firstname must be at least 1 characters.',
  }),
  lastname: z.string().min(1, {
    message: 'Lastname must be at least 1 characters.',
  }),
});

type TAddEmployee = z.infer<typeof formSchema>;

export default function AddEmployee() {
  const form = useForm<TAddEmployee>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await window.electron.ipcRenderer.invoke(
      channels.EMPLOYEE_ADD,
      values,
    );
    console.log(response);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Employee</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="Juan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="Dela Cruz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogContent>
  );
}
