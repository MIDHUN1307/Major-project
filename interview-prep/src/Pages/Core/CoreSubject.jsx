import { useState } from "react";
import axios from "axios";

function CoreSubject() {
    const [file, setFile] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("http://127.0.0.1:8000/core/upload", formData);

        setQuestions(res.data.questions);
        setCurrentQ(0);
        setAnswer("");
        setResult(null);
        setLoading(false);
    };

    const handleEvaluate = async () => {
        if (!answer.trim()) {
            alert("Please enter an answer first");
            return;
        }

        setLoading(true);
        const res = await axios.post("http://127.0.0.1:8000/core/evaluate", {
            question: questions[currentQ],
            answer: answer,
        });

        setResult(res.data);
        setLoading(false);
    };

    const handleNext = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
            setAnswer("");
            setResult(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center p-6">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Core Subject Module
                </h2>

                {/* Upload Section */}
                {!questions.length && (
                    <div className="flex flex-col gap-4">
                        <input
                            type="file"
                            className="border p-2 rounded-lg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button
                            onClick={handleUpload}
                            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            {loading ? "Uploading..." : "Upload PDF"}
                        </button>
                    </div>
                )}

                {/* Question Section */}
                {questions.length > 0 && (
                    <div className="mt-4">

                        {/* Progress */}
                        <p className="text-sm text-slate-500 mb-2">
                            Question {currentQ + 1} of {questions.length}
                        </p>

                        <div className="bg-slate-50 p-4 rounded-lg border mb-4">
                            <h3 className="font-semibold mb-2">Question</h3>
                            <p>{questions[currentQ]}</p>
                        </div>

                        <textarea
                            placeholder="Type your answer..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full border p-3 rounded-lg h-32 mb-4"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={handleEvaluate}
                                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                            >
                                {loading ? "Evaluating..." : "Submit Answer"}
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={currentQ === questions.length - 1}
                                className={`px-4 py-2 rounded-lg text-white ${currentQ === questions.length - 1
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-slate-500 hover:bg-slate-600"
                                    }`}
                            >
                                Next Question →
                            </button>
                        </div>
                    </div>
                )}

                {/* Result Section */}
                {result && (
                    <div className="mt-6 bg-slate-50 p-4 rounded-lg border">
                        <h3 className="font-semibold mb-2">Evaluation Result</h3>

                        <p className="mb-2">
                            <span className="font-medium">Similarity:</span>{" "}
                            {result.similarity.toFixed(2)}
                        </p>

                        <div className="max-h-40 overflow-y-auto text-sm text-slate-700 whitespace-pre-line">
                            {result.llm_feedback}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoreSubject;