import e from "express";

export async function displayMap(req: e.Request, res: e.Response) {
  try {
    res.render("maps/map", {});
  } catch (error) {
    console.log(error);
    res.render("producers/status", { type: "list_error" });
  }
}
