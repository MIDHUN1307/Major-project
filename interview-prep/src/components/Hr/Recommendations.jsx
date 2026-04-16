function Recommendations({ strengths, improvements, aiRecommendations }) {

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl mb-3 text-green-600">Strengths</h2>
        <ul>
          {strengths.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl mb-3 text-orange-600">Improvements</h2>
        <ul>
          {improvements.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl mb-3 text-blue-600">AI Recommendations</h2>
        <ul>
          {aiRecommendations.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Recommendations;