import { useState, useRef } from "react";
import { Mic, MicOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { hrQuestions } from "./hrQuestions";
import QuestionCard from "../../components/Hr/QuestionCard";
import VoiceVisualizer from "../../components/Hr/VoiceVisualizer";
import InterviewFeedback from "../../components/Hr/InterviewFeedback";
import NextSteps from "../../components/Hr/NextSteps";

export default function HRInterview() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const navigate = useNavigate();

  // 🎤 START RECORDING
  const startListening = async () => {
    // Reset previous state
    setTranscript("");
    setFeedback(null);
    setSubmitted(false);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.start();

    audioContextRef.current = new AudioContext();
    const source = audioContextRef.current.createMediaStreamSource(stream);

    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 512;

    dataArrayRef.current = new Uint8Array(
      analyserRef.current.frequencyBinCount
    );

    source.connect(analyserRef.current);

    setIsListening(true);
    trackVolume();
  };

  // 📊 Track volume for visualizer
  const trackVolume = () => {
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
    const avg = sum / dataArrayRef.current.length;

    setVolume(Math.min(avg / 128, 1));
    animationRef.current = requestAnimationFrame(trackVolume);
  };

  // 🛑 STOP RECORDING → SINGLE BACKEND CALL
  const stopListening = async () => {
    cancelAnimationFrame(animationRef.current);
    audioContextRef.current.close();

    mediaRecorderRef.current.stop();
    setIsListening(false);

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, {
        type: "audio/webm"
      });

      const formData = new FormData();
      formData.append("question", hrQuestions[currentIndex]);
      formData.append("audio", blob);

      try {
        setIsProcessing(true);

        const response = await fetch(
          "http://127.0.0.1:8000/speech/evaluate",
          {
            method: "POST",
            body: formData
          }
        );

        const data = await response.json();

        // Set transcript
        setTranscript(data.transcript || "");

        // Store full feedback response
        setFeedback(data);

      } catch (error) {
        console.error("Evaluation error:", error);
      } finally {
        setIsProcessing(false);
      }
    };
  };

  // ✅ Submit → Just show feedback (NO second API call)
  const submitAnswer = () => {
    if (!feedback) {
      alert("Please record your answer first.");
      return;
    }

    setSubmitted(true);
  };

  const retryAnswer = () => {
    setSubmitted(false);
    setFeedback(null);
    setTranscript("");
  };

  const goToNextQuestion = () => {
    setSubmitted(false);
    setTranscript("");
    setFeedback(null);

    if (currentIndex < hrQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const finishInterview = () => {
    if (window.confirm("Are you sure you want to finish the interview?")) {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">
          HR Interview Practice
        </h1>

        <QuestionCard question={hrQuestions[currentIndex]} />

        {/* Recording Section */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative mb-4">
            {isListening && <VoiceVisualizer volume={volume} />}

            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-24 h-24 rounded-full flex items-center justify-center ${
                isListening ? "bg-red-500" : "bg-blue-600"
              }`}
            >
              {isListening ? (
                <MicOff className="text-white" />
              ) : (
                <Mic className="text-white" />
              )}
            </button>
          </div>

          {isProcessing && (
            <p className="text-blue-600 mb-2 font-medium">
              Processing speech...
            </p>
          )}

          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your answer will appear here..."
            className="w-full min-h-[150px] border rounded-lg p-4"
          />
        </div>

        {/* Submit Button */}
        {!submitted && feedback && (
          <button
            onClick={submitAnswer}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Submit Answer
          </button>
        )}

        {/* Feedback Section */}
        {submitted && feedback && (
          <>
            <InterviewFeedback feedback={feedback} />

            <div className="mt-4 flex justify-center">
              <button
                onClick={retryAnswer}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Retry
              </button>
            </div>

            <NextSteps feedback={feedback} />

            {/* Navigation Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              {currentIndex < hrQuestions.length - 1 && (
                <button
                  onClick={goToNextQuestion}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Next Question →
                </button>
              )}

              <button
                onClick={finishInterview}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Finish Interview
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-600 text-center">
              Question {currentIndex + 1} of {hrQuestions.length}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
