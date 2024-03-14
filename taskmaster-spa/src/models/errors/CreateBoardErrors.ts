interface CreateBoardErrors {
  message?: string;
  errors: {
    name?: string[];
  };
}

export default CreateBoardErrors;
