import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  input_box: z.string().max(500, "Text must be less than 500 characters long."),
});

export default function InputBox() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });
  return (
    <div
      className="mt-8 flex flex-col items-center gap-12"
      style={{ backgroundColor: "#ddddf7" }}
    >
      <div style={{ paddingRight: "1rem" }}>
        <Form {...form}>
          <FormField
            control={form.control}
            name="input_box"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter a message</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
      <div style={{ paddingLeft: "1rem" }}>Input</div>
    </div>
  );
}
