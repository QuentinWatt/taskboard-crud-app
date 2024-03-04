import { defineStore } from "pinia";
import { taskApi } from "../config/taskApi";
import Board from "../models/Board";
import Task from "../models/Task";

export const useBoardStore = defineStore("board", {
  state: () => ({
    board: null as Board | null,
    tasks: [] as Task[],
    errors: [] as string[],
  }),
  actions: {
    async getBoard(boardId: string) {
      try {
        const response = await taskApi.get(`/board/${boardId}`);
        this.board = response.data.data;

        if (this.board !== null) {
          this.getTasks();
        }
      } catch (e: any) {
        this.errors = ["Oops! Looks like we couldn't fetch the board data."];
      }
    },
    async getTasks() {
      try {
        const response = await taskApi.get(`/board/${this.board?.id}/tasks`);
        this.tasks = response.data.data;
      } catch (e: any) {
        this.errors = ["There was a problem fetching the tasks."];
      }
    },
    async addTask({ title, is_completed }: Task) {
      this.errors = [];
      try {
        await taskApi.post(`/board/${this.board?.id}/task/new`, {
          title,
          is_completed,
        });
        this.getTasks();
      } catch (e: any) {
        this.errors = ["Could not create task."];
      }
    },
    async updateTask(task: Task) {
      const { title, is_completed } = task;
      try {
        await taskApi.put(`/board/${this.board?.id}/task/${task.id}`, {
          title,
          is_completed,
        });
        this.getTasks();
      } catch (e: any) {
        this.errors = ["We had trouble updating that task."];
      }
    },
    async deleteTask(task: Task) {
      try {
        taskApi.delete(`/board/${this.board?.id}/task/${task.id}`);
        this.tasks = this.tasks.filter((item) => item.id !== task.id);
      } catch (e: any) {
        this.errors = ["Could not delete that task."];
      }
    },
  },
});
