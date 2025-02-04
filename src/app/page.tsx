'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  country: z.string().min(1, 'Улсаа сонгоно уу!'),
  firstName: z.string().min(1, 'Нэрээ оруулна уу!'),
  lastName: z.string().min(1, 'Овгоо оруулна уу!'),
  cardNumber: z.string().min(16, 'Картын дугаар буруу!'),
  month: z.string().min(1, 'Сараа сонгоно уу!'),
  year: z.string().min(1, 'Жилээ сонгоно уу!'),
  cvc: z.string().length(3, 'CVC 3 оронтой байх ёстой!')
});

type FormValues = z.infer<typeof formSchema>;

export default function PaymentForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormValues) => {
    console.log('Submitted Data:', data);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-6">
      <CardContent>
        <h2 className="text-xl font-bold">How would you like to be paid?</h2>
        <p className="text-gray-500 mb-4">Enter location and payment details</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Select country</Label>
            <Select onValueChange={(val) => setValue('country', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
              </SelectContent>
            </Select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label>First name</Label>
              <Input {...register('firstName')} placeholder="Enter your name here" />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div className="flex-1">
              <Label>Last name</Label>
              <Input {...register('lastName')} placeholder="Enter your name here" />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <Label>Enter card number</Label>
            <Input {...register('cardNumber')} placeholder="XXXX-XXXX-XXXX-XXXX" maxLength={16} />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label>Expires</Label>
              <Select onValueChange={(val) => setValue('month', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12)].map((_, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>{i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.month && <p className="text-red-500 text-sm">{errors.month.message}</p>}
            </div>
            <div className="flex-1">
              <Label>Year</Label>
              <Select onValueChange={(val) => setValue('year', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i} value={(2025 + i).toString()}>{2025 + i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
            </div>
            <div className="flex-1">
              <Label>CVC</Label>
              <Input {...register('cvc')} placeholder="CVC" maxLength={3} />
              {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc.message}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full bg-gray-300 text-gray-500 cursor-not-allowed" disabled>Continue</Button>
        </form>
      </CardContent>
    </Card>
  );
}