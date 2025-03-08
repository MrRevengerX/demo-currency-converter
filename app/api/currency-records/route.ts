/* eslint-disable @typescript-eslint/no-explicit-any */
import { ALLOWED_CURRENCIES } from "@/lib/data";
import dbConnect from "@/lib/dbConnection";
import currencyRecord from "@/models/currencyRecord";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { fromCountry, toCountry, amount, convertedAmount } =
      await req.json(); // Get the data from the request body

    if (!ALLOWED_CURRENCIES[fromCountry] || !ALLOWED_CURRENCIES[toCountry]) {
      return NextResponse.json(
        { success: false, message: "Invalid country" },
        { status: 400 }
      );
    }

    const transfer = await currencyRecord.create({
      fromCountry,
      toCountry,
      amount,
      convertedAmount,
      amountSymbol: ALLOWED_CURRENCIES[fromCountry].symbol,
      convertedAmountSymbol: ALLOWED_CURRENCIES[toCountry].symbol,
    });

    return NextResponse.json(
      { success: true, data: transfer },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const transfers = await currencyRecord.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: transfers });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const deletedRecord = await currencyRecord.findOneAndDelete({ _id: id });

    if (!deletedRecord) {
      return NextResponse.json(
        { success: false, message: "Record not found", id: id },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      id: deletedRecord._id,
      message: "Record deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
