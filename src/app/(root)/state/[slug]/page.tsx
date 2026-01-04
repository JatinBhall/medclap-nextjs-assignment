"use client"

import ArrowRightIcon from "@/app/components/icons/arrowRightIcon"
import CalendarIcon from "@/app/components/icons/calendarIcon"
import DollarSignIcon from "@/app/components/icons/dollarSignIcon"
import FileTextIcon from "@/app/components/icons/fileTextIcon"
import data from "@data/states.json"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export interface StateData {
  slug: string;
  name: string;
  ageRequirement: number;
  cardFee: number;
  description: string;
}

const StatePage = ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const [state, setState] = useState<StateData | null>(null)
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { slug } = await params
      const state = data.find((state) => slug == state.slug) ?? data[0]
      setState(state);
    })();
  }, []);

  if (!state) {
    return (
      <div className="min-h-[60vh] bg-[rgba(0,0,0,0.01)] flex items-center justify-center">
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg">
          <div className=" p-6 pb-0">
            <div className="w-24 leading-4 text-red-600 font-semibold">State Not Found</div>
            <div className="w-32 text-[rgb(113,113,130)] mt-1">The state you&apos;re looking for doesn&apos;t exist.</div>
          </div>
          <div className="p-6">
            <button className="bg-black text-white rounded-lg font-semibold py-2 px-4 text-sm cursor-pointer" onClick={() => router.push('/')}>Return Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-linear-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-semibold text-4xl mb-4 bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {state.name}
          </h1>
          <p className="text-xl text-gray-700">{state.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="rounded-xl border-2 border-green-200 bg-linear-to-br from-green-50 to-green-100 p-6">
            <div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-6 w-6 text-green-600" />
                <p className="font-semibold text-lg">Age Requirement</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl text-green-700">{state.ageRequirement}+</p>
              <p className="text-sm text-gray-600 mt-1">years old</p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-blue-200 bg-linear-to-br from-blue-50 to-blue-100 p-6">
            <div>
              <div className="flex items-center space-x-2">
                <DollarSignIcon className="h-6 w-6 text-blue-600" />
                <p className="font-semibold text-lg">Card Fee</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl text-blue-700">${state.cardFee}</p>
              <p className="text-sm text-gray-600 mt-1">application fee</p>
            </div>
          </div>

          <div className="rounded-xl p-6 border-2 border-purple-200 bg-linear-to-br from-purple-50 to-purple-100">
            <div>
              <div className="flex items-center space-x-2">
                <FileTextIcon className="h-6 w-6 text-purple-600" />
                <p className="font-semibold text-lg">Requirements</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                Valid ID, physician recommendation, state residency proof
              </p>
            </div>
          </div>

        </div>

        <div className="rounded-xl border-4 border-purple-200 bg-white shadow-2xl">
          <div className="p-6 pb-0 bg-linear-to-r from-purple-100 to-pink-100">
            <div className="font-semibold text-2xl">Ready to Apply?</div>
            <p className="text-base text-[rgb(113,113,130)]">
              Start your evaluation by filling out the eligibility form
            </p>
          </div>
          <div className=" mt-6 p-6">
            <button
              onClick={() => router.push(`/state/${state.slug}/apply`)}
              className="flex justify-center items-center gap-1 rounded-xl min-h-12 w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-lg cursor-pointer"
            >
              Start Evaluation
              <ArrowRightIcon className="ml-2 h-5 w-5 translate-y-0.5 " />
            </button>
          </div>
        </div>

      </div>
    </div>
  );

}

export default StatePage