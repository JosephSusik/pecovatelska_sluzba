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

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Potřebuju pomoc */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
              <span className="text-red-500 mr-2">🔴</span>
              Potřebuju pomoc
            </h2>
            <div className="space-y-3">
              {questions.map((question) => {
                const answer = answers[question.id];
                if (answer === undefined || answer === false) return null;
                
                return (
                  <div key={question.id} className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r">
                    <p className="text-gray-800 text-sm">
                      {question.yesText}
                    </p>
                  </div>
                );
              })}
              {questions.filter(q => answers[q.id] === true).length === 0 && (
                <p className="text-gray-500 italic">Žádné položky</p>
              )}
            </div>
          </div>

          {/* Zvládám */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
              <span className="text-green-500 mr-2">🟢</span>
              Zvládám
            </h2>
            <div className="space-y-3">
              {questions.map((question) => {
                const answer = answers[question.id];
                if (answer === undefined || answer === true) return null;
                
                return (
                  <div key={question.id} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r">
                    <p className="text-gray-800 text-sm">
                      {question.noText}
                    </p>
                  </div>
                );
              })}
              {questions.filter(q => answers[q.id] === false).length === 0 && (
                <p className="text-gray-500 italic">Žádné položky</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Kontakt
          </h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 w-full">
              <div className='flex flex-col items-center w-full'>
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
