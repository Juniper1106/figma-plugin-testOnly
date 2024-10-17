import "@ui/styles/main.scss";

import AIAvatar from "./components/AIAvatar";
import SliderArea from "./components/SliderArea";
import HistoryActions from "./components/HistoryActions";
import TestButtons from "./components/TestButtons";
import { Button, Flex, Divider} from "antd";

function App() {
  return (
    <div className="homepage">
      <AIAvatar />
      <SliderArea />
      <HistoryActions />
      <TestButtons />
    </div>
  );
}

export default App;
