import { Node, Parent } from "unist";
import { Options } from "./options";
import { isHeadingNode } from "./type-guards";
import { HeadingNode } from "./types";

/**
 * Finds all HTML heading nodes (`<h1>` through `<h6>`)
 */
export function findHeadings(node: Node, options: Options): HeadingNode[] {
  let headingNodes: HeadingNode[] = [];
  findHeadingsRecursive(node, headingNodes, options);
  return headingNodes;
}

/**
 * Recursively crawls the HAST tree and adds all HTML heading nodes to the given array.
 */
function findHeadingsRecursive(node: Node, headingNodes: HeadingNode[], options: Options): void {
  if (isHeadingNode(node, options)) {
    headingNodes.push(node);
  }

  if (node.children) {
    let parent = node as Parent;
    for (let child of parent.children) {
      findHeadings(child, options);
    }
  }
}
