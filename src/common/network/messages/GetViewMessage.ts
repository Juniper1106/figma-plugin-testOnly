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

function getTransformedPoint(x: number, y: number, transform: number[][]): { x: number, y: number } {
  // 计算变换后的点 (x, y) -> 应用 2x3 变换矩阵
  const transformedX = transform[0][0] * x + transform[0][1] * y + transform[0][2];
  const transformedY = transform[1][0] * x + transform[1][1] * y + transform[1][2];
  return { x: transformedX, y: transformedY };
}


export class GetViewMessage extends Networker.MessageType<Payload> {
  public receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  public handle(payload: Payload, from: Networker.Side): void {
    if (figma.editorType === "figma") {
      console.log("GetViewMessage received");
      const viewportBounds = figma.viewport.bounds;
      const topLevelNodes:SceneNode[] = Array.from(figma.currentPage.children) as SceneNode[];
      const allNodes = getAllNodes(topLevelNodes);
      const nodesInView = allNodes.filter(node => {
        const bbox = node.absoluteBoundingBox; // 获取节点的边界框
        if (!bbox) return false;

        const nodeLeft = bbox.x;
        const nodeRight = bbox.x + bbox.width;
        const nodeTop = bbox.y;
        const nodeBottom = bbox.y + bbox.height;

        const viewleft = viewportBounds.x;
        const viewright = viewportBounds.x + viewportBounds.width;
        const viewtop = viewportBounds.y;
        const viewbottom = viewportBounds.y + viewportBounds.height;

        return (
          nodeLeft < viewright && nodeRight > viewleft && // 横向相交
          nodeTop < viewbottom && nodeBottom > viewtop // 纵向相交
        )
      });
      console.log("All nodes in the view:", nodesInView);
    }
  }
}
