"use client"

import { MultipleChoiceView } from "../../components/exercises/multiple-choice-view"

export default function ExercisePage() {
  const sampleQuestion = {
    question: "O que significa 'Daily Routine'?",
    answers: [
      { id: "1", text: "Rotina diária" },
      { id: "2", text: "Fim de semana" },
      { id: "3", text: "Horário de trabalho" },
      { id: "4", text: "Tempo livre" },
    ],
    correctAnswerId: "1",
    audioUrl: undefined,
  }

  return (
    <MultipleChoiceView
      question={sampleQuestion.question}
      answers={sampleQuestion.answers}
      correctAnswerId={sampleQuestion.correctAnswerId}
      audioUrl={sampleQuestion.audioUrl}
      progress={40}
      lives={5}
      onClose={() => window.history.back()}
      onContinue={() => alert("Próximo exercício! (Será implementado)")}
    />
  )
}
