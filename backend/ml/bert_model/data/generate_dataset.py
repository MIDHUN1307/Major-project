import csv

# 100 HR questions (you can add / edit later)
questions = [
    "Tell me about yourself",
    "What are your strengths?",
    "What are your weaknesses?",
    "Why should we hire you?",
    "Why do you want this job?",
    "Where do you see yourself in 5 years?",
    "How do you handle stress?",
    "What motivates you?",
    "Are you a team player?",
    "Describe a challenge you faced",
    "How do you handle failure?",
    "What do you know about our company?",
    "Are you willing to relocate?",
    "How do you manage time?",
    "What are your hobbies?",
    "Describe your leadership skills",
    "How do you handle criticism?",
    "Why did you choose your field?",
    "What makes you unique?",
    "What is your biggest achievement?",
    "What are your career goals?",
    "How do you prioritize work?",
    "How do you handle tight deadlines?",
    "Have you worked on any projects?",
    "What skills do you want to improve?",
    "What do you expect from this job?",
    "How do you handle conflicts?",
    "Are you comfortable working under pressure?",
    "What kind of work environment do you prefer?",
    "How do you keep yourself updated?",
    "What do you do if you don’t know something?",
    "What is your attitude toward learning?",
    "How do you ensure quality in your work?",
    "What role do you usually play in a team?",
    "How do you deal with mistakes?",
    "What do you value most in a job?",
    "How do you approach problem-solving?",
    "What does success mean to you?",
    "How do you handle repetitive tasks?",
    "What kind of leader do you admire?",
    "Why should we trust you?",
    "How do you respond to feedback?",
    "What is your learning style?",
    "What are your long-term plans?",
    "How do you stay productive?",
    "What excites you about this role?",
    "How do you balance work and life?",
    "What is your biggest strength?",
    "How do you handle responsibility?",
    "Why should we choose you over others?",
    "How do you adapt to new environments?",
    "What do you do in your free time?",
    "How do you approach new challenges?",
    "What do you expect from your manager?",
    "How do you define teamwork?",
    "What qualities make a good employee?",
    "How do you stay focused?",
    "What kind of tasks do you enjoy?",
    "How do you handle uncertainty?",
    "What is your professional philosophy?",
    "What does professionalism mean to you?",
    "How do you manage priorities?",
    "What do you do under pressure?",
    "How do you handle responsibility?",
    "What motivates you to perform better?",
    "How do you deal with difficult situations?",
    "What do you expect from your career?",
    "How do you measure success?",
    "What role does ethics play in your work?",
    "How do you stay organized?",
    "What inspires you?",
    "How do you handle mistakes at work?",
    "What is teamwork according to you?",
    "How do you ensure continuous improvement?",
    "What does commitment mean to you?",
    "How do you handle challenges?",
    "What makes a workplace positive?",
    "How do you manage expectations?",
    "What do you do when things go wrong?",
    "How do you improve your skills?",
    "What does growth mean to you?",
    "How do you deal with pressure situations?",
    "What does responsibility mean to you?",
    "How do you handle learning new tools?",
    "What makes you a good fit for this role?",
    "How do you stay motivated at work?",
    "What do you do to improve productivity?",
    "How do you manage multiple tasks?",
    "What is your approach to teamwork?",
    "How do you handle professional challenges?",
    "What does success in a job mean to you?",
    "How do you deal with change?",
    "What keeps you focused at work?"
]

good_answers = [
    "I am highly motivated, adaptable, and continuously work on improving my skills.",
    "I bring dedication, strong problem-solving skills, and a positive attitude.",
    "I am eager to learn and contribute meaningfully to the organization.",
    "I handle responsibilities with sincerity and focus on quality outcomes."
]

average_answers = [
    "I try to do my work properly and learn when needed.",
    "I manage tasks reasonably well most of the time.",
    "I am working on improving myself."
]

poor_answers = [
    "I don’t know.",
    "No idea.",
    "Nothing."
]

output_file = "hr_answers.csv"

with open(output_file, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["question", "answer", "label"])

    for question in questions:
        for ans in good_answers:
            writer.writerow([question, ans, 2])
        for ans in average_answers:
            writer.writerow([question, ans, 1])
        for ans in poor_answers:
            writer.writerow([question, ans, 0])

print("✅ Dataset generated successfully!")
print(f"📄 File created: {output_file}")
print(f"📊 Total rows (excluding header): {len(questions) * 10}")
