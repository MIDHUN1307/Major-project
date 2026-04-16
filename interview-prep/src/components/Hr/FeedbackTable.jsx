function FeedbackTable({ feedbackData }) {

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">

      <h2 className="text-xl mb-6">Question-wise Feedback</h2>

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Question</th>
            <th className="text-left py-2">Answer</th>
            <th className="text-left py-2">Score</th>
            <th className="text-left py-2">Feedback</th>
          </tr>
        </thead>

        <tbody>

          {feedbackData.map((item, index) => (

            <tr key={index} className="border-b">

              <td className="py-3">{item.question}</td>
              <td className="py-3">{item.answerSummary}</td>
              <td className="py-3">{item.score}</td>
              <td className="py-3">{item.feedback}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default FeedbackTable;