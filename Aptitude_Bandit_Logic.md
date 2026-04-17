# Adaptive Question Generation: UCB Multi-Armed Bandit

This document explains the conceptual framework and implementation logic of the Adaptive Aptitude module in the Interview Prep project.

## 1. Questions in the Frontend: Is it OK?

In your current implementation, the questions are stored in a JavaScript object (`aptitudeQuestions.js`) on the client side.

### ✅ Why it's good (for this project):
- **Zero Latency**: Questions load instantly without waiting for API calls.
- **Simplicity**: No need for complex database schemas or backend endpoints just to serve static text.
- **Offline Capability**: The test can technically run without a stable internet connection once the page is loaded.

### ⚠️ Trade-offs for a "Real-World" App:
- **Security & Cheating**: Users can open the browser console (Inspect Element) and see all the answers in the source code.
- **Content Management**: To add new questions, you have to redeploy the frontend.
- **Scaling**: If you have 10,000+ questions, the initial page load will become very slow.

**Verdict**: For a **Major Project/MVP**, this is perfectly acceptable and demonstrates clear logic. For a production-ready SaaS product, you would move these to a Database (like PostgreSQL or MongoDB) and fetch them via an API.

---

## 2. The UCB Bandit Logic & Score Calculation

The **Upper Confidence Bound (UCB)** algorithm treats each aptitude topic (Percentages, Profit & Loss, etc.) as a "slot machine" (bandit) that we want to pull. Our goal is to pull the "lever" that provides the most value—in our case, the topic where you need the most practice.

### The Formula
The "Practice Need Score" for each topic is calculated as:
`Score = Practice Priority (Exploration) + Practice Need (Exploitation)`

#### A. Practice Need (Exploitation)
We use the **Error Rate** as our primary reward signal.
- `Error Rate = Total Wrong / Total Attempts`
- A high error rate (e.g., 80%) means you are struggling with this topic, so the score increases to prioritize it.

#### B. Exploration Bonus (The "Curiosity" Factor)
To ensure the system doesn't just show you the same hard topic forever, we add an exploration bonus:
- `Bonus = explorationFactor * sqrt(ln(Total_Session_Attempts) / Topic_Attempts)`
- **ln(Total\_Session\_Attempts)** grows slowly as you take more tests.
- **Topic\_Attempts** is in the denominator. This means if you haven't tried a topic in a while, its bonus grows **HUGE**, forcing the system to "check in" on your progress there.

---

## 3. Thresholds and Score Interpretation

### Adaptive Selection Threshold
The generator calculates a score for **every** topic and picks the top $N$ highest scores. There isn't a single "fixed" threshold (like 0.5), but rather a **relative comparison**:

| Score Range | Meaning | Action Taken by System |
| :--- | :--- | :--- |
| **> 1.5** | **Highly Critical** | Topic is either brand new (high exploration) or you are failing it consistently. |
| **0.8 - 1.2** | **Moderately Weak** | You have some wrong answers here; it will appear frequently. |
| **< 0.5** | **Mastered** | High accuracy and high attempt count. This topic will rarely appear. |

### The "Cold Start" Threshold (`priorStrength`)
Since $0/0$ is mathematically undefined, we use a **Prior**:
- `priorStrength = 2`
- `priorErrorRate = 0.3`
This acts as a "fallback" threshold. It tells the system: *"Assume every new topic is slightly difficult (30% error) until the user proves otherwise."* This prevents new topics from having a score of `Infinity` and breaking the selection logic.

---

## 4. How the Adaptive Test is Generated

1. **Calculate Scores**: For all topics, compute the UCB score using current stats in `localStorage`.
2. **Rank & Pick**: Sort topics by score.
3. **Question Selection**: 
   - Pick the top topic.
   - Select a question the user hasn't seen in the current session.
   - Increment "Local Attempts" (simulated) so the same topic doesn't get picked for all 10 questions in a single test.
4. **Update**: After you submit the test, the **real** stats are saved, and the "Practice Need" for next time is updated.
