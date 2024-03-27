// import { Fragment, useState } from "react";
// import {
//   FaceSmileIcon as FaceSmileIconOutline,
//   PaperClipIcon,
// } from "@heroicons/react/24/outline";
// import { Listbox, Transition } from "@headlessui/react";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useRouter } from "next/navigation";
// // import { z } from "zod";
// // import { useForm } from "react-hook-form";
// import user3 from "@/../public/user3.jpg";
// import Image from "next/image";
// import {
//   FaceFrownIcon,
//   FaceSmileIcon as FaceSmileIconMini,
//   FireIcon,
//   HandThumbUpIcon,
//   HeartIcon,
//   XMarkIcon,
// } from "@heroicons/react/20/solid";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, useForm } from "react-hook-form";

// const formSchema = z.object({
//   text: z.string().max(1000, "Review must be less than 1000 characters long."),
// });

// const moods = [
//   {
//     name: "Excited",
//     value: "excited",
//     icon: FireIcon,
//     iconColor: "text-white",
//     bgColor: "bg-red-500",
//   },
//   {
//     name: "Loved",
//     value: "loved",
//     icon: HeartIcon,
//     iconColor: "text-white",
//     bgColor: "bg-pink-400",
//   },
//   {
//     name: "Happy",
//     value: "happy",
//     icon: FaceSmileIconMini,
//     iconColor: "text-white",
//     bgColor: "bg-green-400",
//   },
//   {
//     name: "Sad",
//     value: "sad",
//     icon: FaceFrownIcon,
//     iconColor: "text-white",
//     bgColor: "bg-yellow-400",
//   },
//   {
//     name: "Thumbsy",
//     value: "thumbsy",
//     icon: HandThumbUpIcon,
//     iconColor: "text-white",
//     bgColor: "bg-blue-500",
//   },
//   {
//     name: "I feel nothing",
//     value: null,
//     icon: XMarkIcon,
//     iconColor: "text-gray-400",
//     bgColor: "bg-transparent",
//   },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function handleSubmit() {}

// export default function InputBox() {
//   const [selected, setSelected] = useState(moods[5]);

//   return (
//     <div className="flex items-start space-x-4" style={{ width: "100%" }}>
//       <div className="flex-shrink-0">
//         <Image
//           className="inline-block h-10 w-10 rounded-full"
//           src={user3}
//           alt=""
//         />
//       </div>
//       <div className="min-w-0 flex-1">
//         <form onSubmit={handleSubmit} action="#">
//           <div className="border-b border-gray-200 focus-within:border-indigo-600">
//             <label htmlFor="comment" className="sr-only">
//               Enter a message
//             </label>
//             <textarea
//               rows={3}
//               name="comment"
//               id="comment"
//               className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
//               placeholder="Enter a message"
//               defaultValue={""}
//             />
//             {/* <div className="flex w-1/2 flex-col justify-between pl-5">
//               <Form {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(onSubmit)}
//                   className="space-y-4"
//                 >
//                   <FormField
//                     control={form.control}
//                     name="text"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Textarea
//                             placeholder="Write your review..."
//                             {...field}
//                           />
//                         </FormControl>
//                         {errors.text && (
//                           <FormMessage>{errors.text.message}</FormMessage>
//                         )}
//                       </FormItem>
//                     )}
//                   />
//                 </form>
//               </Form>
//             </div> */}
//             <div className="flex justify-between pt-2">
//               <div className="flex items-center space-x-5">
//                 <div className="flow-root">
//                   <button
//                     type="button"
//                     className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
//                   >
//                     <PaperClipIcon className="h-6 w-6" aria-hidden="true" />
//                     <span className="sr-only">Attach a file</span>
//                   </button>
//                 </div>
//                 <div className="flow-root">
//                   <Listbox value={selected} onChange={setSelected}>
//                     {({ open }) => (
//                       <>
//                         <Listbox.Label className="sr-only">
//                           Your mood
//                         </Listbox.Label>
//                         <div className="relative">
//                           <Listbox.Button className="relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
//                             <span className="flex items-center justify-center">
//                               {selected.value === null ? (
//                                 <span>
//                                   <FaceSmileIconOutline
//                                     className="h-6 w-6 flex-shrink-0"
//                                     aria-hidden="true"
//                                   />
//                                   <span className="sr-only">Add your mood</span>
//                                 </span>
//                               ) : (
//                                 <span>
//                                   <span
//                                     className={classNames(
//                                       selected.bgColor,
//                                       "flex h-8 w-8 items-center justify-center rounded-full",
//                                     )}
//                                   >
//                                     <selected.icon
//                                       className="h-5 w-5 flex-shrink-0 text-white"
//                                       aria-hidden="true"
//                                     />
//                                   </span>
//                                   <span className="sr-only">
//                                     {selected.name}
//                                   </span>
//                                 </span>
//                               )}
//                             </span>
//                           </Listbox.Button>

//                           <Transition
//                             show={open}
//                             as={Fragment}
//                             leave="transition ease-in duration-100"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                           >
//                             <Listbox.Options className="absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
//                               {moods.map((mood) => (
//                                 <Listbox.Option
//                                   key={mood.value}
//                                   className={({ active }) =>
//                                     classNames(
//                                       active ? "bg-gray-100" : "bg-white",
//                                       "relative cursor-default select-none px-3 py-2",
//                                     )
//                                   }
//                                   value={mood}
//                                 >
//                                   <div className="flex items-center">
//                                     <div
//                                       className={classNames(
//                                         mood.bgColor,
//                                         "flex h-8 w-8 items-center justify-center rounded-full",
//                                       )}
//                                     >
//                                       <mood.icon
//                                         className={classNames(
//                                           mood.iconColor,
//                                           "h-5 w-5 flex-shrink-0",
//                                         )}
//                                         aria-hidden="true"
//                                       />
//                                     </div>
//                                     <span className="ml-3 block truncate font-medium">
//                                       {mood.name}
//                                     </span>
//                                   </div>
//                                 </Listbox.Option>
//                               ))}
//                             </Listbox.Options>
//                           </Transition>
//                         </div>
//                       </>
//                     )}
//                   </Listbox>
//                 </div>
//               </div>
//               <div className="flex-shrink-0">
//                 <button
//                   type="submit"
//                   className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../../ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
      style={{ backgroundColor: "#ffffff" }}
    >
      <div style={{ paddingRight: "1rem" }}>
        <Form {...form}>
          <FormField
            control={form.control}
            name="input_box"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6">
                  Enter a message
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="text-grey-800 absolute bottom-0 right-0 mb-5 mr-5 w-40 border border-black bg-[#F4EDEA] hover:text-white"
            type="submit"
          >
            Confirm
          </Button>
        </Form>
      </div>
      <div style={{ paddingLeft: "1rem" }}>Input</div>
    </div>
  );
}
