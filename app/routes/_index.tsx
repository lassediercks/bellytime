import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface Exercise {
  id: number;
  name: string;
}

interface TrainUnit {
  exercise: Exercise;
  sets: number;
  reps: number;
}

export default function Index() {
  const [trainPlan, setTrainPlanState] = useState<TrainUnit[]>([]);
  const [repValues, setRepValues] = useState<{ [key: number]: number }>({});
  const [setValues, setSetValues] = useState<{ [key: number]: number }>({});

  const addExercise = (exercise: Exercise, sets: number, reps: number) => {
    setTrainPlanState((prev) => {
      return [...prev, { exercise, sets, reps }];
    });
    repValues[exercise.id] = 0;
    setValues[exercise.id] = 0;
  };

  const handleRepChange = (id: number, value: number) => {
    setRepValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSetChange = (id: number, value: number) => {
    setSetValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="">
      <div className="bg-yellow-300">
        <h1>Debug zone</h1>
        repvalues:
        {JSON.stringify(repValues)}
        <br />
        <br />
        setValues:
        {JSON.stringify(setValues)}
        <br />
        <br />
        trainPlan:
        {JSON.stringify(trainPlan)}
        <br />
        <br />
      </div>
      <h1 className="text-2xl">Exercises:</h1>
      {exercises.map(({ name, id }) => (
        <div className="flex mb-2 gap-4" key={id}>
          {name}
          <div className="flex gap-4">
            reps:
            <input
              className="bg-slate-50 border-slate-500 border-2"
              type="number"
              value={repValues[id] || ""}
              onChange={(e) => handleRepChange(id, parseInt(e.target.value))}
            />
            sets:
            <input
              className="bg-slate-50 border-slate-500 border-2"
              type="number"
              value={setValues[id] || ""}
              onChange={(e) => handleSetChange(id, parseInt(e.target.value))}
            />
            <button
              className="bg-slate-500 text-white p-2"
              onClick={() =>
                addExercise({ id, name }, setValues[id], repValues[id])
              }
            >
              Add
            </button>
          </div>
        </div>
      ))}

      <h1 className="text-2xl">Plan:</h1>
      <div>
        {trainPlan.map(({ exercise, sets, reps }, index) => (
          <div key={index}>
            {exercise.name} - reps: {reps} - sets: {sets}
          </div>
        ))}
      </div>
    </div>
  );
}

const exercises: Exercise[] = [
  { id: 1, name: "Squats" },
  { id: 2, name: "Lunges" },
  { id: 3, name: "Pushups" },
  { id: 4, name: "Pullups" },
];
