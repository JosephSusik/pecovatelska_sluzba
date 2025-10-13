import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface Question {
  id: string;
  text: string;
  yesText: string;
  noText: string;
}

interface ResultsProps {
  answers: Record<string, boolean>;
  questions: Question[];
}

export const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { answers, questions } = location.state as ResultsProps || { answers: {}, questions: [] };

  const handleBackToQuestionnaire = () => {
    navigate('/');
  };

  const getAnswerText = (question: Question, answer: boolean) => {
    return answer ? question.yesText : question.noText;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vyhodnocení dotazníku
          </h1>
          <p className="text-gray-600">
            Přehled vašich odpovědí a potřeb
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Vaše odpovědi:
          </h2>
          <div className="space-y-4">
            {questions.map((question) => {
              const answer = answers[question.id];
              if (answer === undefined) return null;
              
              return (
                <div key={question.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-gray-800">
                    {getAnswerText(question, answer)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Kontakt
          </h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-semibold text-gray-900">Mgr. Kateřina Fabíková</p>
                <p className="text-gray-600">Tel.: 556 778 300</p>
                <p className="text-gray-600">E-mail: katerina.fabikova@novyjicin.cz</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleBackToQuestionnaire}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Zpět na dotazník
          </Button>
        </div>
      </div>
    </div>
  );
};
