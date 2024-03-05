import { defineStore } from "pinia";
import { taskApi } from "../config/taskApi";
import Board from "../models/Board";
import GetBoardErrors from "../models/errors/GetBoardErrors";
import CreateBoardErrors from "../models/errors/CreateBoardErrors";

export const useBoardsStore = defineStore("boards", {
  state: () => ({
    boards: [] as Board[],
    errors: {
      create: {} as CreateBoardErrors,
      getBoard: {} as GetBoardErrors,
    },
  }),
  actions: {
    async getBoards() {
      try {
        const response = await taskApi.get(`/boards`);
        this.boards = response.data.data;
      } catch (e: any) {
        this.errors.getBoard = {
          message: "Oops! Looks like we couldn't fetch the board data.",
        };
      }
    },
    async createBoard(name: string) {
      try {
        await taskApi.post(`/board/new`, {
          name,
        });
        this.getBoards();
      } catch (e: any) {
        this.errors.create = {
          message: e.response.data.message,
          errors: e.response.data.errors,
        };
      }
    },
  },
  getters: {
    hasCreateError(state): boolean {
      return !!state.errors.create.message;
    },
    createErrorMessage(state): string | null {
      return state.errors.create.message ? state.errors.create.message : null;
    },
    nameError(state): string | null {
      return state.errors.create.errors?.name
        ? state.errors.create.errors?.name[0]
        : null;
    },
  },
});
