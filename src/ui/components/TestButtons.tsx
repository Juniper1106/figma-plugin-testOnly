import { Button, Flex } from "antd";
import "./TestButtons.scss"

import { NetworkMessages } from "@common/network/messages";

 
function TestButtons() {
    return (
    <div className="testButtons">
      <Flex gap="small" justify="center" align="center" wrap>
        <Button
          type="primary"
          onClick={
            () => {
              NetworkMessages.GET_CANVAS.send({});
            }
          }
        >
          Get Canvas
        </Button>

        <Button
          type="primary"
          onClick={
            () => {
              NetworkMessages.GET_VIEW.send({})
            }
          }
        >
          Get View
        </Button>
      </Flex>
    </div>
    );
}

export default TestButtons;