import { ViewStart } from './component/viewStart.js'
import { ViewChat } from './component/viewChat.js'
import { RuleModal } from './component/ruleModal.js'
import { setScreen } from './app.js'
const app = document.getElementById("app");
const ruleModal = new RuleModal()
app.appendChild(ruleModal.render())

const viewStart = new ViewStart();
setScreen(viewStart);
