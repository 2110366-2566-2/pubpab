"use client";

import Image from "next/image";
import starNotFill from "@/../public/Star.svg";
import starFill from "@/../public/StarFill.svg";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  review: z
    .string()
    .length(1000, "Review must be less than 1000 characters long."),
});

const WriteReviewCard = ({
  accommodationName,
  roomName,
  location,
  imageURL,
  rating,
}: {
  accommodationName: string;
  roomName: string;
  location: string;
  imageURL: any;
  rating: number;
}) => {
  const renderStars = () => {
    const starImages = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starImages.push(
          <Image
            key={i}
            src={starFill}
            alt="Filled Star"
            className="h-6 w-6"
          />,
        );
      } else {
        starImages.push(
          <Image
            key={i}
            src={starNotFill}
            alt="Filled Star"
            className="h-6 w-6"
          />,
        );
      }
    }
    return starImages;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Card className="relative m-4 w-2/3 p-5">
      <div className="flex">
        <div className="w-2/3">
          <div className="mb-2">
            <h2 className="text-xl font-semibold">{accommodationName}</h2>
            <h1 className="text-2xl font-semibold">{roomName}</h1>
            <p className="text-l">{location}</p>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image src={imageURL} width={600} height={600} alt="Hotel" />
          </div>
        </div>
        <div className="flex w-1/2 flex-col justify-between pl-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormItem>
                <div className="mb-20"></div>
                <div>
                  <p className="text-lg font-semibold">Rating</p>
                  <div className="mb-2 mt-2 flex items-center">
                    {renderStars()}
                  </div>
                </div>
                <div className="flex flex-grow flex-col">
                  <FormLabel className="mb-2 text-lg font-semibold">
                    Review
                  </FormLabel>
                  <Textarea
                    placeholder="Write your review..."
                    {...control}
                    name="review"
                  />
                  {errors.review && (
                    <FormMessage>{errors.review.message}</FormMessage>
                  )}
                </div>
              </FormItem>
            </form>
          </Form>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 mb-5 mr-5">
        <Button
          className="text-grey-800 w-40 border border-black bg-[#F4EDEA] hover:text-white"
          type="submit"
        >
          Confirm
        </Button>
      </div>
    </Card>
  );
};

export default WriteReviewCard;
