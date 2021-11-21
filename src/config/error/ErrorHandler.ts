import { Errors } from "./Errors";

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err);

  if (err instanceof Errors) {
    res.status(err.code).json({ error: err.message });
    return;
  }
  res.status(500).json("Something went wrong");
};
