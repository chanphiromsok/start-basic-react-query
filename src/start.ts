import { createStart } from "@tanstack/react-start";
import { linguiMiddleware } from "./locales/lingui-middleware";


export const startInstance = createStart(() => {
    return {
        requestMiddleware: [linguiMiddleware],
    };
});