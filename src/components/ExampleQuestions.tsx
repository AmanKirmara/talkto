"use client";
export const projects = [
  {
    description:
      "A technology company that builds economic infrastructure for the internet.",
    questions: [
      "How does economic infrastructure on the internet impact businesses?",
      "What are the benefits of a strong internet economic infrastructure?",
    ],
  },
  {
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    questions: [
      "How is AI used in content recommendation for streaming services?",
      "What is the future of AI in video streaming platforms?",
    ],
  },
  {
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    questions: [
      "What role does AI play in enhancing internet-related services?",
      "How does AI improve user experience in online services?",
    ],
  },
  {
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    questions: [
      "How is AI being used in social media platforms?",
      "What are the ethical considerations of AI in social media?",
    ],
  },
  {
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    questions: [
      "How does AI improve customer experience in e-commerce?",
      "What are the latest AI advancements in cloud computing?",
    ],
  },
  {
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    questions: [
      "How is AI shaping the future of personal computing?",
      "What role does AI play in software development?",
    ],
  },
];

interface ExampleQuestionsProps {
  setSelectedSuggestionQuestion: (question: string) => void;
}

export function ExampleQuestions({
  setSelectedSuggestionQuestion,
}: ExampleQuestionsProps) {
  return (
    <div className="p-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 w-full bg-gray-900 rounded-xl">
      {projects.map((item, index) => (
        <div
          key={index}
          className="p-4 transition-all cursor-pointer text-sm flex items-center justify-center h-full w-full bg-gray-950 border border-transparent hover:border-slate-700 rounded-2xl"
          onClick={() => setSelectedSuggestionQuestion(item.description)}
        >
          {item.description}
        </div>
      ))}
    </div>
  );
}
