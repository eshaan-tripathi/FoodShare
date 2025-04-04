import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // For dropdown icons

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null); // State to keep track of which question is open

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the currently open answer if clicked again
    } else {
      setOpenIndex(index); // Open the clicked answer
    }
  };

  const faqs = [
    {
      question: "What is Food Share?",
      answer:
        "Food Share is a platform that rescues surplus food and delivers it to those in need, reducing food waste and fighting hunger.",
    },
    {
      question: "How does Food Share work?",
      answer:
        "We collect excess food from NGOs, temples, restaurants, and individuals, then distribute it to underprivileged communities.",
    },
    {
      question: "How can I donate food?",
      answer:
        "You can register on our platform, list surplus food, and our team will arrange a pickup or guide you to the nearest collection center.",
    },
    {
      question: "Can I donate money instead of food?",
      answer:
        "Yes, monetary donations help us with logistics, storage, and transportation costs.",
    },
  ];

  return (
    <section className="bg-gray-800 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md mb-6 cursor-pointer"
            onClick={() => toggleAnswer(index)} // Toggle answer visibility on click
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{faq.question}</h3>
              <div>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-indigo-500" />
                ) : (
                  <ChevronDown size={20} className="text-indigo-500" />
                )}
              </div>
            </div>

            {openIndex === index && (
              <p className="text-gray-700 mt-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
