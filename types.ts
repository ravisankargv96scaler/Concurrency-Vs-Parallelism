export enum TabId {
  Kitchen = 'kitchen',
  Concurrency = 'concurrency',
  Parallelism = 'parallelism',
  Workload = 'workload',
  Gopher = 'gopher',
  Quiz = 'quiz',
}

export interface SimulationProps {
  isActive: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}