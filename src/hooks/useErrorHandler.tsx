import React, { useState } from "react";
import { Message, useToaster } from "rsuite";

export const useErrorHandler = () => {
  const toaster = useToaster();
  const validateError = (error: any) => {
    console.log("error", error);
    console.log("error", error.response);
    // if (!(error instanceof Array)) error = { response: { errors: error.errors } };
    const errors: any = error;
    for (const err of errors.response.errors) {
      if (err.details) {
        const details = Object.values<String>(err.details);
        details.map((msg) =>
          toaster.push(
            <Message closable showIcon type="error">
              {msg}
            </Message>
          )
        );
      } else {
        toaster.push(
          <Message closable showIcon type="error">
            {err.message}
          </Message>
        );
      }
    }
  };
  return {
    validateError,
  };
};
