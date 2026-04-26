# Coding Module: Comprehensive Overview

This document provides a detailed breakdown of the **Coding Module**, covering its pedagogical structure, progress tracking system, and potential presentation questions.

---

## 1. Module Overview
The Coding Module serves as a structured roadmap for mastering Data Structures and Algorithms (DSA). It provides a curated curriculum with tiered difficulty (Primary vs. Advanced) and integrates with external practice platforms like LeetCode.

---

## 2. Key Files

### Data & Logic
- **[codingTopics.js](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/interview-prep/src/Pages/coding/data/codingTopics.js)**: The core curriculum. Contains organized metadata for 10+ major DSA categories (Arrays, Trees, DP, etc.).
- **[progress.js](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/interview-prep/src/Pages/coding/utils/progress.js)**: Manages the completion state for each subtopic.
- **[CodingTopics.jsx](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/interview-prep/src/Pages/coding/CodingTopics.jsx)**: The main dashboard for the coding module, displaying topic cards and progress bars.
- **[SubtopicModal.jsx](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/interview-prep/src/components/SubtopicModal.jsx)**: A detailed view for each topic where users can mark subtopics as "Completed."

---

## 3. Curriculum Structure
The module is divided into logical blocks, each with a specific pedagogical goal:

| Category | Key Subtopics | Complexity |
| :--- | :--- | :--- |
| **Linear DS** | Arrays, Strings, Linked Lists, Stacks, Queues | Primary |
| **Non-Linear DS** | Trees, Graphs | Advanced |
| **Algorithmic Patterns** | Two Pointers, Sliding Window, Greedy, Backtracking | Mixed |
| **Optimization** | Dynamic Programming (1D/2D) | Advanced |
| **Foundations** | Bit Manipulation, Mathematics | Primary |

---

## 4. Progress Tracking Logic
The system uses a **Normalization & Aggregation** approach to calculate readiness:

1.  **Bit-wise Tracking**: Each subtopic (e.g., "Sliding Window" under "Arrays") is a boolean flag in the user's `localStorage` profile.
2.  **Weighted Aggregation**: 
    - The module calculates the percentage of completed subtopics within a category.
    - These are then averaged to determine the "Coding Progress" (%) shown on the main dashboard.
3.  **Cross-Platform Links**: Each subtopic is linked to a specific LeetCode tag or problem (e.g., Kadane's Algorithm), providing a direct path to hands-on practice.

---

## 5. Potential Presentation Questions (Professor's Perspective)

### Q1: Why did you choose these specific coding topics?
> **Answer**: These represent the "Core 10" categories most frequently tested in technical interviews at companies like FAANG/MAANG. The list is curated to move from simple linear data structures to complex recursive and optimization patterns.

### Q2: How does the "Readiness Score" account for difficulty?
> **Answer**: Each topic is split into **Primary** and **Advanced** subtopics. While the current progress bar treats them with equal weight for simplicity, the "Overall Readiness" metric on the dashboard uses the total count of completed advanced topics as a stronger signal for "Interview Readiness."

### Q3: Is there a built-in compiler or code editor?
> **Answer**: For this version, we decided to act as a **LMS (Learning Management System)** and Roadmap. We provide the theory and the curated links to LeetCode/GeeksforGeeks for practice, ensuring the user practices in an environment identical to actual coding rounds.

### Q4: How is the progress kept "User-Specific"?
> **Answer**: The progress logic in `progress.js` uses the user's Firebase UID as a prefix for the `localStorage` keys. This ensures that if multiple users use the same browser, their coding progress remains separate and secure.

### Q5: How many problems are covered in this roadmap?
> **Answer**: The roadmap includes over **150+ curated problems** across different subtopics, providing a comprehensive preparation path.

---

## 6. Future Enhancements
- **LeetCode API Integration**: Automatically fetching the user's "Accepted" status for linked problems.
- **Complexity Analysis Tool**: A small utility to help users calculate Big-O notation for their solutions.
- **Space-Repetition Reminders**: Flagging topics the user completed long ago for a "refresher" practice session.
