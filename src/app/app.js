//import 'underscore';
import React from "react";
import { createRoot } from "react-dom/client";
import { Grid } from "./gridComponent";

const container = document.getElementById("main");
const root = createRoot(container);

root.render(<Grid />);
