import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  text: string;
  yesText: string;
  noText: string;
}

const questions: Question[] = [
  {
    id: 'q1',
    text: 'Potřebujete pomoc se stravováním a dovozem obědů?',
    yesText: 'Potřebuju pomoc se stravováním a dovozem obědů',
    noText: 'Nepotřebuju pomoc se stravováním a dovozem obědů'
  },
  {
    id: 'q2',
    text: 'Potřebujete pomoc s osobní hygienou a péčí o sebe?',
    yesText: 'Potřebuju pomoc s osobní hygienou a péčí o sebe',
    noText: 'Nepotřebuju pomoc s osobní hygienou a péčí o sebe'
  },
  {
    id: 'q3',
    text: 'Potřebujete pomoc s domácími pracemi a úklidem?',
    yesText: 'Potřebuju pomoc s domácími pracemi a úklidem',
    noText: 'Nepotřebuju pomoc s domácími pracemi a úklidem'
  },
  {
    id: 'q4',
    text: 'Potřebujete pomoc s nákupy a obstaráváním potřeb?',
    yesText: 'Potřebuju pomoc s nákupy a obstaráváním potřeb',
    noText: 'Nepotřebuju pomoc s nákupy a obstaráváním potřeb'
  },
  {
    id: 'q5',
    text: 'Potřebujete doprovod k lékařům a na úřady?',
    yesText: 'Potřebuju doprovod k lékařům a na úřady',
    noText: 'Nepotřebuju doprovod k lékařům a na úřady'
  },
  {
    id: 'q6',
    text: 'Potřebujete společnost a pomoc s aktivitami?',
    yesText: 'Potřebuju společnost a pomoc s aktivitami',
    noText: 'Nepotřebuju společnost a pomoc s aktivitami'
  }
];

export const Questionnaire: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const allQuestionsAnswered = questions.every(q => answers[q.id] !== null && answers[q.id] !== undefined);

  const getMissingQuestions = () => {
    return questions.filter(q => answers[q.id] === null || answers[q.id] === undefined);
  };

  const handleEvaluate = () => {
    console.log('All questions answered:', allQuestionsAnswered);
    console.log('Missing questions:', getMissingQuestions());
    console.log('Answers:', answers);
    setIsModalOpen(true);
  };

  const handleConfirmEvaluation = () => {
    setIsModalOpen(false);
    navigate('/vyhodnoceni', { state: { answers, questions } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dotazník pro pečovatelskou službu
          </h1>
          <p className="text-gray-600">
            Prosím odpovězte na následující otázky podle svých potřeb
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question) => {
            const isAnswered = answers[question.id] !== null && answers[question.id] !== undefined;
            return (
            <div key={question.id} className={`bg-white rounded-lg shadow-md p-6 ${!isAnswered ? 'ring-2 ring-orange-200' : ''}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {question.text}
                {!isAnswered && <span className="text-orange-500 ml-2">*</span>}
              </h3>
              <div className="flex gap-4">
                <Button
                  variant={answers[question.id] === true ? "default" : "outline"}
                  onClick={() => handleAnswer(question.id, true)}
                  className={`flex-1 ${
                    answers[question.id] === true 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : answers[question.id] === false 
                        ? 'opacity-50' 
                        : ''
                  }`}
                >
                  Ano
                </Button>
                <Button
                  variant={answers[question.id] === false ? "default" : "outline"}
                  onClick={() => handleAnswer(question.id, false)}
                  className={`flex-1 ${
                    answers[question.id] === false 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : answers[question.id] === true 
                        ? 'opacity-50' 
                        : ''
                  }`}
                >
                  Ne
                </Button>
              </div>
            </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={handleEvaluate}
            className={`px-8 py-3 text-lg ${
              allQuestionsAnswered 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {allQuestionsAnswered ? 'Vyhodnotit' : 'Zkontrolovat odpovědi'}
          </Button>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={!allQuestionsAnswered ? 'text-orange-600' : ''}>
                {allQuestionsAnswered ? 'Potvrdit vyhodnocení' : '⚠️ Chybí odpovědi'}
              </DialogTitle>
              <DialogDescription>
                {allQuestionsAnswered 
                  ? 'Jste si jisti, že chcete pokračovat k vyhodnocení vašich odpovědí?'
                  : 'Prosím odpovězte na všechny otázky před pokračováním:'
                }
              </DialogDescription>
            </DialogHeader>
            {!allQuestionsAnswered && (
              <div className="my-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                  <span className="text-orange-500 mr-2">⚠️</span>
                  Chybějící otázky:
                </h4>
                <ul className="space-y-2">
                  {getMissingQuestions().map((question) => (
                    <li key={question.id} className="text-sm text-orange-700 flex items-start">
                      <span className="text-orange-500 mr-2 font-bold">•</span>
                      {question.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                {allQuestionsAnswered ? 'Zrušit' : 'Zavřít'}
              </Button>
              {allQuestionsAnswered && (
                <Button
                  onClick={handleConfirmEvaluation}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Ano, pokračovat
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
