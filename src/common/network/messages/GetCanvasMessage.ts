import { NetworkSide } from "@common/network/sides";
import * as Networker from "monorepo-networker";

interface Payload {}

function getAllNodes(nodes: SceneNode[]): SceneNode[] {
  let allNodes:SceneNode[] = [];
  for (const node of nodes) {
    allNodes.push(node);
    if ("children" in node) {
      allNodes = allNodes.concat(getAllNodes(Array.from(node.children) as SceneNode[])); // 递归查找子元素
    }
  }
  return allNodes;
}

export class GetCanvasMessage extends Networker.MessageType<Payload> {
  public receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  public handle(payload: Payload, from: Networker.Side): void {
    if (figma.editorType === "figma") {
      console.log("GetCanvasMessage received");
      const topLevelNodes:SceneNode[] = Array.from(figma.currentPage.children) as SceneNode[];
      const allNodes = getAllNodes(topLevelNodes);
      console.log("All nodes on the canvas:", allNodes);
    }
  }
}
