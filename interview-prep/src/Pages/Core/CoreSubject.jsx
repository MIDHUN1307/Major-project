import { useState } from "react";
import axios from "axios";
import { db, auth } from "../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CoreSubject() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // New State for scoring and results
    const [scores, setScores] = useState([]); // stores similarity scores
    const [testCompleted, setTestCompleted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file first");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post("http://127.0.0.1:8000/core/upload", formData);

            setQuestions(res.data.questions);
            setCurrentQ(0);
            setAnswer("");
            setResult(null);
            setScores(new Array(res.data.questions.length).fill(null));
            setTestCompleted(false);
        } catch (error) {
            console.error("Upload error", error);
            toast.error("Failed to upload and generate questions");
        }
        setLoading(false);
    };

    const handleEvaluate = async () => {
        if (!answer.trim()) {
            toast.error("Please enter an answer first");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("http://127.0.0.1:8000/core/evaluate", {
                question: questions[currentQ],
                answer: answer,
            });

            setResult(res.data);

            // Update scores array using the more accurate LLM score (normalized to 0-1)
            const newScores = [...scores];
            newScores[currentQ] = res.data.llm_score / 100;
            setScores(newScores);

        } catch (error) {
            console.error("Evaluation error", error);
            toast.error("Failed to evaluate answer");
        }
        setLoading(false);
    };

    const handleNext = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
            setAnswer("");
            setResult(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            setTestCompleted(true);
        }
    };

    const calculateFinalScore = () => {
        const total = scores.reduce((acc, curr) => acc + (curr || 0), 0);
        return Math.round((total / questions.length) * 100);
    };

    const saveResultToFirebase = async () => {
        if (!auth.currentUser) {
            toast.error("Please login to save your results");
            return;
        }

        setIsSaving(true);
        try {
            await addDoc(collection(db, "core_results"), {
                userId: auth.currentUser.uid,
                questions: questions,
                scores: scores,
                finalScore: calculateFinalScore(),
                createdAt: serverTimestamp()
            });
            toast.success("Results saved successfully!");
        } catch (error) {
            console.error("Firebase save error", error);
            toast.error("Failed to save results");
        }
        setIsSaving(false);
    };

    // Result Screen UI
    if (testCompleted) {
        const finalScore = calculateFinalScore();
        return (
            <div className="min-h-screen bg-slate-50 flex justify-center p-6">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-600 mb-4">
                            <span className="text-3xl font-bold">{finalScore}%</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800">Assessment Complete!</h2>
                        <p className="text-slate-500 mt-2">Here is your performance summary</p>
                    </div>

                    <div className="space-y-4 text-left mb-8">
                        {questions.map((q, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 rounded-lg border">
                                <p className="font-medium text-slate-800 mb-1">Q{idx + 1}: {q}</p>
                                <p className="text-sm">
                                    <span className="text-slate-500">Score:</span>{" "}
                                    <span className={`font-semibold ${scores[idx] > 0.7 ? "text-emerald-600" : "text-amber-600"}`}>
                                        {Math.round(scores[idx] * 100)}%
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={saveResultToFirebase}
                            disabled={isSaving}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {isSaving ? "Saving..." : "Save Result to Profile"}
                        </button>
                        <button
                            onClick={() => navigate("/student/dashboard")}
                            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition"
                        >
                            Go to Dashboard
                        </button>
                        <button
                            onClick={() => {
                                setQuestions([]);
                                setTestCompleted(false);
                                setFile(null);
                            }}
                            className="w-full py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition"
                        >
                            Take Another Test
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center p-6 text-slate-800">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">
                    Core Subject Module
                </h2>

                {/* Upload Section */}
                {!questions.length && (
                    <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                        <div className="mb-4 text-slate-400 text-5xl">📄</div>
                        <h3 className="text-lg font-semibold mb-2">Upload Study Material</h3>
                        <p className="text-sm text-slate-500 mb-6">Upload a PDF to generate adaptive questions</p>

                        <div className="flex flex-col gap-4 w-full max-w-xs">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept="application/pdf"
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer bg-white border border-slate-300 py-2 px-4 rounded-lg text-center hover:bg-slate-50 transition"
                            >
                                {file ? file.name : "Select PDF File"}
                            </label>

                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {loading ? "Generating Questions..." : "Generate Test"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Question Section */}
                {questions.length > 0 && (
                    <div className="mt-4">

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-sm text-slate-500 mb-2">
                                <span>Question {currentQ + 1} of {questions.length}</span>
                                <span>{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-blue-600 h-full transition-all duration-300"
                                    style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
                            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Current Question</h3>
                            <p className="text-lg font-medium text-slate-800">{questions[currentQ]}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Your Answer</h3>
                            <textarea
                                placeholder="Write your detailed answer here..."
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="w-full border border-slate-200 p-4 rounded-2xl h-40 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleEvaluate}
                                disabled={loading}
                                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition disabled:opacity-50"
                            >
                                {loading ? "Evaluating..." : "Submit Answer"}
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={loading || !result}
                                className={`flex-1 py-3 rounded-xl font-bold transition ${(!result || loading)
                                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    : "bg-slate-800 text-white hover:bg-slate-900"
                                    }`}
                            >
                                {currentQ === questions.length - 1 ? "Finish & See Results →" : "Next Question →"}
                            </button>
                        </div>

                        {/* Feedback Section */}
                        {result && (
                            <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                    <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
                                        <h3 className="font-bold text-slate-800">Evaluation Feedback</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-slate-500">Score:</span>
                                            <span className={`font-bold ${result.llm_score >= 70 ? "text-emerald-600" : "text-amber-600"}`}>
                                                {result.llm_score}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                                        {result.llm_feedback}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoreSubject;
