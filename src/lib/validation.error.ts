import { ZodError, ZodIssue } from "zod";

class ValidationError {
  public fieldErrors: {
    [key: string]: string[] | undefined;
  } = {};
  public formErrors: string[] = [];

  constructor({ fieldErrors, formErrors }: {
    fieldErrors?: { [key: string]: string[] | undefined };
    formErrors?: string[];
  } = {}) {
    if (fieldErrors) this.fieldErrors = fieldErrors;
    if (formErrors) this.formErrors = formErrors;
  }
}

export default ValidationError;
