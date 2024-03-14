interface Task {
  id?: number;
  title: string;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export default Task;
