import { asReduxStore } from "mobx-state-tree/middleware/redux"
import { addMiddleware } from "mobx-state-tree"


export default function createPlugin(logrocket, mobXStore, options) {
  const reduxMiddleware = logrocket.reduxMiddleware(options);
  const reduxStore = asReduxStore(mobXStore);
  
  const middlewareWithStore = reduxMiddleware(reduxStore);
  return addMiddleware(mobXStore, (call, next) => {
    middlewareWithStore(next)(call);
    return next(call);
  });
}
