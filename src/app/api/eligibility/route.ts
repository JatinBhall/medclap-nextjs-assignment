import { NextResponse } from "next/server";
import data from "@data/states.json"

interface Submission {
  fullName: string;
  email: string;
  state: string;
  age: number;
  medicalCondition: string;
  agreeToPolicy: boolean;
  submittedAt: string;
}

export async function POST(request: Request) {

  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const body = await request.json();
    const { fullName, email, state, age, medicalCondition, agreeToPolicy } = body;

    if (!agreeToPolicy) {
      return NextResponse.json(
        { message: 'You must agree to the privacy policy' },
        { status: 400 }
      );
    }

    // Validate data
    if (!fullName || !email || !state || !age || !medicalCondition) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }


    if (fullName.length < 3) {
      return NextResponse.json(
        { message: "Please enter at least 3 characters in Full Name field" },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    const stateData = data.find((stateObj) => state == stateObj.slug) ?? data[0]
    if (age < stateData.ageRequirement) {
      return NextResponse.json(
        { message: `You must be ${stateData.ageRequirement} years or older to proceed` },
        { status: 400 }
      );
    }

    if (medicalCondition.length < 10) {
      return NextResponse.json(
        { message: `Please enter at least 10 characters in Medical Condition field` },
        { status: 400 }
      );
    }


    return NextResponse.json(
      { message: "Form submitted successfully", data: { fullName, email } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request", error },
      { status: 500 }
    );
  }
}