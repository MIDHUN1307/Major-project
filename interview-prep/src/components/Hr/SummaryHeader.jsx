import { Calendar, User, Briefcase } from "lucide-react";

function SummaryHeader({ candidateName, interviewDate, interviewType }) {

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">

      <h1 className="text-3xl font-semibold mb-2">Interview Summary</h1>

      <p className="text-gray-600 mb-4">
        AI-generated analysis of your HR interview performance
      </p>

      <div className="flex flex-wrap gap-6">

        {/* Candidate */}
        <div className="flex items-center gap-2">
          <User className="text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">Candidate</p>

            <p className="font-medium">
              {candidateName || "Unknown Candidate"}
            </p>
          </div>
        </div>

        {/* Interview Date */}
        <div className="flex items-center gap-2">
          <Calendar className="text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">Interview Date</p>

            <p className="font-medium">
              {interviewDate || "Not Available"}
            </p>
          </div>
        </div>

        {/* Interview Type */}
        <div className="flex items-center gap-2">
          <Briefcase className="text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">Interview Type</p>

            <p className="font-medium">
              {interviewType || "HR Interview"}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default SummaryHeader;