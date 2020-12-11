import Router from "./router";
import { handleAdd } from "./handlers/add";
import { handleList } from "./handlers/list";

const router = new Router();

router.register({ method: "GET", path: "/api/add" }, handleAdd);
router.register({ method: "GET", path: "/api/list" }, handleList);

router.serve();
