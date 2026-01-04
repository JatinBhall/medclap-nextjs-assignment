"use client"

import FileTextIcon from "@/app/components/icons/fileTextIcon";
import UsersIcon from "@/app/components/icons/usersIcon";
import { useSubmittedFormsData } from "@/app/context/submittedFormsContext";

const SubmissionPage = () => {

  const { submittedForms } = useSubmittedFormsData()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-[80vh] bg-linear-to-br from-violet-50 via-purple-50 to-fuchsia-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold mb-4 bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-700">View and manage all form submissions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl  border-2 border-violet-200 bg-linear-to-br from-violet-50 to-violet-100 p-6 pb-12">
            <div className="mb-6 flex items-center space-x-2">
              <UsersIcon className="h-6 w-6 text-violet-600" />
              <p className="font-semibold">Total Submissions</p>
            </div>
            <p className="text-4xl text-violet-700">{submittedForms.length}</p>
          </div>

          <div className="rounded-xl p-6 pb-12 border-2 border-fuchsia-200 bg-linear-to-br from-fuchsia-50 to-fuchsia-100">
            <div className="mb-6 flex items-center space-x-2">
              <FileTextIcon className="h-6 w-6 text-fuchsia-600" />
              <p className="font-semibold">Recent Applications</p>
            </div>
            <div>
              <p className="text-4xl text-fuchsia-700">
                {submittedForms.filter((s) => {
                  const submittedDate = new Date(s.createdAt);
                  const date = new Date();
                  const dayAgo = new Date(date.getTime() - 24 * 60 * 60 * 1000);
                  return submittedDate > dayAgo;
                }).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">in the last 24 hours</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-4 border-purple-200 bg-white shadow-2xl">
          <div className=" p-6 pb-0 bg-linear-to-r from-violet-100 to-fuchsia-100">
            <p className="text-2xl font-semibold">All Submissions</p>
            <p className="text-[rgb(113,113,113)]">Complete list of eligibility applications</p>
          </div>
          <div className="pt-6">
            {submittedForms.length === 0 ? (
              <div className="text-center py-12">
                <FileTextIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No submissions yet</p>
                <p className="text-gray-400 text-sm mt-2">Applications will appear here once submitted</p>
              </div>
            ) : (
              <div className="p-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="h-10 bg-purple-50 shadow z-10 ">
                      <td className="px-2 text-sm font-semibold">Name</td>
                      <td className="px-2 text-sm font-semibold">Email</td>
                      <td className="px-2 text-sm font-semibold">State</td>
                      <td className="px-2 text-sm font-semibold">Age</td>
                      <td className="px-2 text-sm font-semibold">Date Submitted</td>
                    </tr>
                  </thead>
                  <tbody>
                    {submittedForms.map((submission, index) => (
                      <tr key={index} className="h-10 hover:bg-purple-50 transition-colors">
                        <td className="px-2 text-sm ">{submission.fullName}</td>
                        <td className="px-2 text-sm">{submission.email}</td>
                        <td className="px-2 text-sm ">
                          <div className="px-2 rounded-md w-fit text-[13px] font-semibold bg-linear-to-r from-purple-500 to-pink-500 text-white capitalize">
                            {`[`}{submission.state.replace('-', ' ')}{`]`}
                          </div>
                        </td>
                        <td className="px-2 text-sm ">{submission.age}</td>
                        <td className="text-sm text-gray-600">
                          {formatDate(submission.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionPage