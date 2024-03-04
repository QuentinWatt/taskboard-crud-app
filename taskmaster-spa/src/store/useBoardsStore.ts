import { defineStore } from "pinia";
import Board from "../models/Board";
import { taskApi } from "../config/taskApi";

export const useBoardsStore = defineStore("boards", {
  state: () => ({
    boards: [] as Board[],
    errors: [] as string[],
  }),
  actions: {
    async getBoards() {
      try {
        const response = await taskApi.get(`/boards`);
        this.boards = response.data.data;
      } catch (e: any) {
        this.errors = ["Oops! Looks like we couldn't fetch the board data."];
      }
    },
  },
});
