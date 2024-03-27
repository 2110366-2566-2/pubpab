"use client";

import Image from "next/image";
import starNotFill from "@/../public/Star.svg";
import starFill from "@/../public/StarFill.svg";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import {
  Form,
  FormControl,
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  review: z
    .string()
    .max(1000, "Review must be less than 1000 characters long."),
});

const WriteReviewCard = ({
  reservationId,
  accommodationId,
  userId,
  accommodationName,
  roomName,
  location,
  imageURL,
  rating,
  onRatingChange,
}: {
  reservationId: string;
  accommodationId: string;
  userId: string;
  accommodationName: string;
  roomName: string;
  location: string;
  imageURL: any;
  rating: number;
  onRatingChange: (rating: number) => void;
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const renderStars = () => {
    const starImages = [];
    for (let i = 0; i < 5; i++) {
      const starNumber = i + 1;
      starImages.push(
        <Image
          key={i}
          src={
            starNumber <= (selectedRating ?? rating) ? starFill : starNotFill
          }
          alt="Star"
          className="h-6 w-6 cursor-pointer"
          onClick={() => handleStarClick(starNumber)}
        />,
      );
    }
    return starImages;
  };

  const handleStarClick = (starNumber: number) => {
    setSelectedRating(starNumber);
    onRatingChange(starNumber);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createReview = trpc.review.writeReview.useMutation();
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createReview.mutateAsync({
        reservation_id: reservationId,
        traveler_id: userId,
        accommodation_id: accommodationId,
        picture: "", // Set the picture if needed
        text: data.review,
        score: rating, // Assuming 'rating' is passed from props
      });
      console.log(data.review);
      console.log("Review submitted successfully");
      router.push("/");
      // You can add logic here to redirect or show a success message
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle error (e.g., show error message)
    }
  }

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
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-20"></div>
                    <div>
                      <p className="text-lg font-semibold">Rating</p>
                      <div className="mb-2 mt-2 flex items-center">
                        {renderStars()}
                      </div>
                    </div>

                    <FormLabel className=" mb-2 flex flex-grow flex-col text-lg font-semibold">
                      Review
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your review..." {...field} />
                    </FormControl>
                    {errors.review && (
                      <FormMessage>{errors.review.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <Button
                className="text-grey-800 absolute bottom-0 right-0 mb-5 mr-5 w-40 border border-black bg-[#F4EDEA] hover:text-white"
                type="submit"
              >
                Confirm
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Card>
  );
};

export default WriteReviewCard;
