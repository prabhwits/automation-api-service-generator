import { paths } from "./paths";
import { search } from "./search";
import { select } from "./select";
import { init } from "./init";
import { confirm } from "./confirm";
import { status } from "./status";
import { track } from "./track";
import { cancel } from "./cancel";
import { update } from "./update";
import { on_search } from "./on_search";
import { on_select } from "./on_select";
import { on_init } from "./on_init";
import { on_confirm } from "./on_confirm";
import { on_track } from "./on_track";
import { on_cancel } from "./on_cancel";
import { on_update } from "./on_update";
import { on_status } from "./on_status";

export default function getSchema(action: string) {
    switch (action) {
        case "paths":
            return paths;
        case "search":
            return search;
        case "select":
            return select;
        case "init":
            return init;
        case "confirm":
            return confirm;
        case "status":
            return status;
        case "track":
            return track;
        case "cancel":
            return cancel;
        case "update":
            return update;
        case "on_search":
            return on_search;
        case "on_select":
            return on_select;
        case "on_init":
            return on_init;
        case "on_confirm":
            return on_confirm;
        case "on_track":
            return on_track;
        case "on_cancel":
            return on_cancel;
        case "on_update":
            return on_update;
        case "on_status":
            return on_status;
        default:
            throw new Error("Action not found");
    }
}
