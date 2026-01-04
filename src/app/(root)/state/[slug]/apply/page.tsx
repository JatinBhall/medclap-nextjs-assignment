"use client"

import { useEffect, useState } from "react";
import { StateData } from "../page";
import { useRouter } from "next/navigation";
import data from "@data/states.json"
import Label from "@/app/components/formInputs/label";
import InputField from "@/app/components/formInputs/inputField";
import TextAreaInputField from "@/app/components/formInputs/tsxtextAreaInput";
import SendIcon from "@/app/components/icons/sendIcon";
import formValidation from "@/app/lib/formValidation";
import { toast } from "react-toastify";
import { useSubmittedFormsData } from "@/app/context/submittedFormsContext";

const ApplyPage = ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const { submittedForms, insertFormData } = useSubmittedFormsData()
  const [state, setState] = useState<StateData | null>(null)
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [age, setAge] = useState<number>(0)
  const [medicalCondition, setMedicalCondition] = useState<string>("")
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { slug } = await params
      const state = data.find((state) => slug == state.slug) ?? data[0]
      setState(state);
    })();
  }, []);

  function handleFullNameChange(newValue: string) {
    setFullName(newValue.trim());
  }
  function handleEmailChange(newValue: string) {
    setEmail(newValue);
  }
  function handleAgeChange(newValue: string) {
    setAge(Number(newValue));
  }
  function handleMedicalConditionChange(newValue: string) {
    setMedicalCondition(newValue.trim());
  }
  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAcceptedTerms(event.target.checked);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (! await checkValidation()) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          age,
          state: state?.slug,
          medicalCondition,
          agreeToPolicy: acceptedTerms
        }),
      });

      const data = await res.json();
      if (res.status == 400) {
        toast.error(`error : ${data.message}`);
      } else {
        insertFormData({
          fullName,
          email,
          age,
          medicalCondition,
          state: state?.slug ?? "",
          createdAt: Date()
        })
        toast.success(`${data.message}`);
        router.push(`/state/${state?.slug}/success?name=${fullName}&email=${email}`);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function checkValidation() {
    const validationResult = await formValidation(fullName, email, age, state?.ageRequirement ?? 18, medicalCondition);
    setErrorType(validationResult.errorType ?? "")
    setErrorMessage(validationResult.errorMessage ?? "")

    const oldForm = submittedForms.find((form) => form.email == email)
    if (oldForm) {
      setErrorType("email")
      setErrorMessage("email already exist")
      return false;
    }

    return validationResult.result;
  }

  return (
    <div className="min-h-[80vh] bg-linear-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-semibold mb-4 bg-linear-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Eligibility Evaluation
          </h1>
          <p className="text-gray-700">Fill out the form below to check your eligibility</p>
        </div>

        <div className="rounded-xl border-4 border-orange-200 bg-white shadow-2xl">
          <div className="bg-linear-to-r from-orange-100 to-pink-100 p-6 pb-0">
            <p className="font-semibold">Application Form</p>
            <p className="text-[rgb(113,113,130)]">All fields marked with <span className="text-[#f00]">*</span> are required</p>
          </div>
          <div className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              <div>
                <Label text="Full Name" className="mb-2" required={true} />
                <InputField className="" type="text" placeholder="John Wick" required={true} value={fullName} onChange={handleFullNameChange} />
                {errorType == "name" && <p className="text-[red] text-[13px] font-semibold">{errorMessage}</p>}
              </div>
              <div>
                <Label text="Email Address" className="mb-2" required={true} />
                <InputField className="" type="email" placeholder="jhon.wick@gmail.com" required={true} value={email} onChange={handleEmailChange} />
                {errorType == "email" && <p className="text-[red] text-[13px] font-semibold">{errorMessage}</p>}
              </div>
              <div>
                <Label text="Age" className="mb-2" required={true} />
                <InputField className="" type="number" placeholder="24" required={true} value={age} onChange={handleAgeChange} />
                {errorType == "age" && <p className="text-[red] text-[13px] font-semibold">{errorMessage}</p>}
              </div>
              <div>
                <Label text="Medical Condition" className="mb-2" required={true} />
                <TextAreaInputField className="" placeholder="Please describe your medical condition and symptoms..." required={true} value={medicalCondition} onChange={handleMedicalConditionChange} />
                {errorType == "medicalCondition" && <p className="text-[red] text-[13px] font-semibold">{errorMessage}</p>}
              </div>

              <div className=" flex items-center space-x-2 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  id="agreeToPolicy"
                  checked={acceptedTerms}
                  onChange={handleCheckboxChange}
                />
                <p className="text-sm font-semibold">
                  I agree to the privacy policy and terms of service *
                </p>
              </div>


              <button
                type="submit"
                disabled={loading || !acceptedTerms}
                className="min-h-[48px] flex justify-center items-center rounded-xl w-full bg-linear-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white text-lg shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <SendIcon className="ml-2 translate-y-0.5 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyPage