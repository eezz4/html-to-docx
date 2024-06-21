/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */

export function fixCustomVTree(nodeArray) {
  try {
    if (!Array.isArray(nodeArray)) return nodeArray;

    const result = nodeArray.map(stripSpanOnAnchor).map(replaceDivWithParaIncludingStrong);

    result.forEach((node) => {
      node.children = fixCustomVTree(node.children);
    });

    return result;
  } catch (e) {
    console.error('e::: ', e);
    return [];
  }
}

function stripSpanOnAnchor(node) {
  if (node.tagName === 'span' && node.children.length === 1) {
    const singleChild = node.children[0];
    if (singleChild.tagName === 'a') return singleChild;
  }
  return node;
}

function replaceDivWithParaIncludingStrong(node) {
  if (node.tagName === 'div' && node.children.some((child) => child.tagName === 'strong')) {
    node.tagName = 'p';
  }
  return node;
}
