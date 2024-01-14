import { remove } from "npm:unist-util-remove"

export default function removeSrLabels() {
  return (tree) =>
    remove(tree, { cascade: true }, (node) => {
      return node.type === "element" && node.properties?.className?.includes("sr-only")
    }) || undefined
}