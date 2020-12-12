/// <reference types="react-scripts" />

import { State } from "./stores";

declare module "react-redux" {
	interface DefaultRootState extends State {}
}
