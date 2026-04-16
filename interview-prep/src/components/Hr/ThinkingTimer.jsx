import { useEffect, useRef, useState } from "react";

export default function ThinkingTimer({
  question,
  onSkip,
  isRecording
}) {
  const INITIAL_TIME = 15;

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [active, setActive] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const timerRef = useRef(null);

  // Start timer whenever question changes
  useEffect(() => {
    setTimeLeft(INITIAL_TIME);
    setActive(true);
    setShowPopup(false);

    startTimer();

    return () => clearInterval(timerRef.current);
  }, [question]);

  // Stop timer when recording starts
  useEffect(() => {
    if (isRecording) {
      clearInterval(timerRef.current);
      setActive(false);
    }
  }, [isRecording]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setActive(false);
          setShowPopup(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const giveMoreTime = () => {
    setShowPopup(false);
    setTimeLeft(10);
    setActive(true);
    startTimer();
  };

  const skipQuestion = () => {
    setShowPopup(false);
    onSkip();
  };

  return (
    <>
      {/* Countdown Display */}
      {active && (
        <div
          className={`mb-4 text-lg font-semibold ${
            timeLeft <= 5 ? "text-red-600" : "text-gray-700"
          }`}
        >
          Please start answering in {timeLeft}s
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[400px]">
            <h3 className="text-lg font-bold mb-3">
              No Response Detected
            </h3>

            <p className="text-gray-600 mb-6">
              You haven't started answering yet.
              Do you need more time?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={giveMoreTime}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Give Me 10 Seconds
              </button>

              <button
                onClick={skipQuestion}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Skip Question
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}