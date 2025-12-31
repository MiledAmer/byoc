"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createOrder } from "@/lib/actions";

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  customerEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  customerPhone: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }),
  shippingAddress: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
});

export function CheckoutForm() {
  const { items, clearCart, getTotal } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      shippingAddress: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (items.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
      return
    }

    setIsSubmitting(true)


    try {
      const orderData = {
        ...values,
        items: items.map(item => ({
          productId: item.product._id,
          variantKey: item.variant._key,
          weight: item.variant.weight,
          quantity: item.quantity,
          price: item.variant.price
        })),
        totalAmount: getTotal()
      }

      const result = await createOrder(orderData)
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/checkout/success?orderId=${result.orderNumber}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Foulen Ben Foulen"
                  className="border-neon/30 focus:border-neon bg-black/50 text-white placeholder:text-white/30"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="foulenBenFoulen@example.com"
                    type="email"
                    className="border-neon/30 focus:border-neon bg-black/50 text-white placeholder:text-white/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+216 22 345 678"
                    className="border-neon/30 focus:border-neon bg-black/50 text-white placeholder:text-white/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="shippingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Shipping Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tunisia, Tunis 1002, rue de la paix, appartement 12"
                  className="border-neon/30 focus:border-neon min-h-[100px] resize-none bg-black/50 text-white placeholder:text-white/30"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-neon hover:bg-neon/80 w-full py-6 text-lg font-bold tracking-wider text-black uppercase"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </Form>
  );
}
