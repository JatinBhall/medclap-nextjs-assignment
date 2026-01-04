"use client"

import { useEffect, useState } from "react"
import { StateData } from "../page"
import data from "@data/states.json"
import Link from "next/link"
import { SubmittedFormType, useSubmittedFormsData } from "@/app/context/submittedFormsContext"
import { useSearchParams } from "next/navigation"
import CheckCircleIcon from "@/app/components/icons/checkCircleIcon"
import HomeIcon from "@/app/components/icons/homeIcon"

const SuccessPage = ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const searchParams = useSearchParams()
  const { submittedForms } = useSubmittedFormsData()
  const [state, setState] = useState<StateData | null>(null)
  const email = searchParams.get('email')
  const userFormData = submittedForms.find((form) => form.email == email);
  console.log(userFormData, submittedForms);

  useEffect(() => {
    (async () => {
      const { slug } = await params
      const state = data.find((state) => slug == state.slug) ?? data[0]
      setState(state);
    })();
  }, []);

  return (
    <div className="min-h-[80vh] bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 flex items-center justify-center">
      <div className="rounded-xl max-w-2xl border-4 border-green-300 bg-white shadow-2xl">
        <div className="text-center bg-linear-to-r from-green-100 to-emerald-100 p-6 pb-0">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 rounded-full p-4 animate-bounce">
              <CheckCircleIcon className="h-16 w-16 text-white" />
            </div>
          </div>
          <div className="text-3xl font-semibold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Application Submitted!
          </div>
          <p className="text-xl text-[rgb(113,113,130)] mt-2">
            Thank you for your submission
          </p>
        </div>
        <div className="pt-12 space-y-6 p-6">
          <div className="bg-linear-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
            <p className="text-xl text-center text-gray-800">
              Thank you, <span className="text-green-600">{userFormData?.fullName}</span>!
            </p>
            <p className="text-center text-gray-600 mt-2">
              Your application for a medical card in <span className="text-emerald-600 capitalize">{`[`}{state?.slug?.replace('-', ' ')}{`]`}</span> has been successfully submitted.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>What&apos;s next?</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
              <li>Your application will be reviewed within 5-7 business days</li>
              <li>You&apos;ll receive an email confirmation shortly</li>
              <li>Further instructions will be sent to your email address</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="min-h-9 text-sm cursor-pointer rounded-md font-semibold flex-1 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
              <Link href="/" className="flex w-full justify-center items-center gap-2" >
                <HomeIcon className="h-5 w-5" />
                <p>Return Home</p>
              </Link>
            </button>
            <button className="min-h-9 text-sm cursor-pointer rounded-md font-semibold flex-1 border-2 border-green-300 hover:bg-green-50">
              <Link href={`/state/${state?.slug ?? ""}`}>
                View State Info
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage