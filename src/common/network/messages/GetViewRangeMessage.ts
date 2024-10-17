import { NetworkSide } from "@common/network/sides";
import * as Networker from "monorepo-networker";

interface Payload {
  range: number;
}

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


function getViewRangeCenter(nodesSelection: SceneNode[]): {x: number, y: number} {
  if (nodesSelection.length === 0) {
    return figma.viewport.center;
  }
  let left = Number.MAX_VALUE;
  let right = Number.MIN_VALUE;
  let top = Number.MAX_VALUE;
  let bottom = Number.MIN_VALUE;  
  for (const node of nodesSelection) {
    const bbox = node.absoluteBoundingBox;
    if (!bbox) continue;
    const bboxLeft = bbox.x;
    const bboxRight = bbox.x + bbox.width;
    const bboxTop = bbox.y;
    const bboxBottom = bbox.y + bbox.height;
    left = Math.min(left, bboxLeft);
    right = Math.max(right, bboxRight);
    top = Math.min(top, bboxTop);
    bottom = Math.max(bottom, bboxBottom);
  }
  return {x: (left + right) / 2, y: (top + bottom) / 2};
}

export class GetViewRangeMessage extends Networker.MessageType<Payload> {
  public receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  public handle(payload: Payload, from: Networker.Side): void {
    if (figma.editorType === "figma") {
      console.log("GetViewRangeMessage received");
      console.log("View range:", payload.range);
      const topLevelNodes:SceneNode[] = Array.from(figma.currentPage.children) as SceneNode[];
      const allNodes = getAllNodes(topLevelNodes);
      const nodesSelected = getAllNodes(Array.from(figma.currentPage.selection) as SceneNode[]);
      const nodesUnselected = allNodes.filter(node => !nodesSelected.includes(node));
      const viewRangeCenter = getViewRangeCenter(nodesSelected);
      console.log("View range center:", viewRangeCenter);
      //计算所有nodesUnslected距离viewRangeCenter的距离，保存在数组中
      const distances = nodesUnselected.map(node => {
        if (nodesSelected.includes(node)) return 0;
        const bbox = node.absoluteBoundingBox;
        if (!bbox) return Number.MAX_VALUE;
        const nodeCenter = {x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2};
        const dx = nodeCenter.x - viewRangeCenter.x;
        const dy = nodeCenter.y - viewRangeCenter.y;
        return Math.sqrt(dx * dx + dy * dy);
      });
      //除去距离为0的最大值和最小值
      const minDistance = Math.min(...distances);
      const maxDistance = Math.max(...distances);
      let distance = 0;
      if (maxDistance === minDistance) {
        distance = maxDistance / 50 * payload.range;
      } else {
        distance = (maxDistance - minDistance) / 70 * (payload.range - 15) + minDistance;
      }
      const nodesInRange = nodesSelected.concat(nodesUnselected.filter((node, index) => distances[index] < distance));
      console.log("All nodes in the view range:", nodesInRange);
    }
  }
}
