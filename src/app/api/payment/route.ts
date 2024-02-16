import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../lib/client";
// const createIssueSchema = z.object({
//   title: z.string().min(1).max(255),
//   description: z.string().min(1),
// });

// enum PaymentStatusEnum {
//   Waiting = "Waiting",
//   Ongoing = "Ongoing",
//   Success = "Success",
//   Fail = "Fail",
// }

// const createPaymentSchema = z.object({
//   payment_id: z.string().refine((val) => val.length === 36, {
//     message: "payment_id should be a string of length 36",
//   }),
//   timestamp: z.date().default(() => new Date()),
//   amount: z.number().nullable(),
//   host_bank_account: z.string().refine((val) => val.length === 36, {
//     message: "host_bank_account should be a string of length 36",
//   }),
//   traveler_bank_account: z.string().refine((val) => val.length === 36, {
//     message: "traveler_bank_account should be a string of length 36",
//   }),
//   payment_status: z.enum(PaymentStatusEnum),
//   qrcode_payment: z.string(),
// });
// method  add payment POST
export async function POST(request: NextRequest) {
  const body = await request.json();
  //   const validation = createIssueSchema.safeParse(body);
  //   if (!validation.success)
  //     return NextResponse.json(validation.error.errors, { status: 400 });
  const newIssue = await prisma.payment.create({
    data: {
      payment_id: body.payment_id,
      amount: body.amount,
      host_bank_account: body.host_bank_account,
      traveler_bank_account: body.traveler_bank_account,
      payment_status: body.payment_status,
      qrcode_payment: body.qrcode_payment,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}

// {
//     "payment_id": "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6",
//     "timestamp": "2024-01-31T12:34:56.789Z",

//     "amount": 100.50,
//     "host_bank_account": "host_account_123456",
//     "traveler_bank_account": "traveler_account_987654",
//     "payment_status": "Success",
//     "qrcode_payment": "qrcode_123456"
//   },
