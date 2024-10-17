import { CreateRectMessage } from "@common/network/messages/CreateRectMessage";
import { GetCanvasMessage } from "@common/network/messages/GetCanvasMessage";
import { GetViewMessage } from "@common/network/messages/GetViewMessage";
import { GetViewRangeMessage } from "@common/network/messages/GetViewRangeMessage";
import { HelloMessage } from "@common/network/messages/HelloMessage";
import { PingMessage } from "@common/network/messages/PingMessage";
import { NetworkSide } from "@common/network/sides";
import * as Networker from "monorepo-networker";

export namespace NetworkMessages {
  export const registry = new Networker.MessageTypeRegistry();

  export const PING = registry.register(new PingMessage("ping"));

  export const HELLO_PLUGIN = registry.register(
    new HelloMessage(NetworkSide.PLUGIN)
  );

  export const HELLO_UI = registry.register(new HelloMessage(NetworkSide.UI));

  export const CREATE_RECT = registry.register(
    new CreateRectMessage("create-rect")
  );

  export const GET_CANVAS = registry.register(
    new GetCanvasMessage("get-canvas")
  );

  export const GET_VIEW = registry.register(
    new GetViewMessage("get-view")
  );

  export const GET_VIEW_RANGE = registry.register(
    new GetViewRangeMessage("get-view-range")
  );
}
