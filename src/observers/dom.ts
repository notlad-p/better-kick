import EventEmitter from "../event-emitter";

const IGNORED_HTML_TAGS = new Set([
  "BR",
  "HEAD",
  "LINK",
  "META",
  "SCRIPT",
  "STYLE",
]);

class DOMObserver extends EventEmitter {
  selectors: string[];
  constructor() {
    super();
    console.log("DOM OBSERVER CONSTRUCTOR");
    this.selectors = [];
    const observer = new MutationObserver((mutations) => {
      const nodes = [];

      // loop through selectors object
      for (const { addedNodes, removedNodes, target } of mutations) {
        if (
          !addedNodes ||
          !removedNodes ||
          (addedNodes.length === 0 && removedNodes.length === 0)
        ) {
          continue;
        }

        const foundNodes = [...addedNodes, ...removedNodes];

        for (let i = 0; i < foundNodes.length; i++) {
          const node = foundNodes[i];
          if (
            node.nodeType !== Node.ELEMENT_NODE ||
            IGNORED_HTML_TAGS.has(node.nodeName)
          ) {
            continue;
          }

          if (node.childNodes.length === 0) {
            continue;
          }

          // get all children of node (including grandchildren)
          for (const childNode of node.querySelectorAll("[id],[class]")) {
            nodes.push([target, childNode]);
          }
        }
      }

      if (!nodes || nodes.length === 0) {
        return;
      }

      // loop through selectors and check if any node matches the selector
      for (const [_target, node] of nodes) {
        if (!node) continue;
        for (let i = 0; i < this.selectors.length; i++) {
          const selector = this.selectors[i];

          if (node.matches(selector)) {
            this.emit(selector, node, node.isConnected);
          }
        }
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }

  on<T = HTMLElement>(selector: string, callback: (node: T, isConnected: boolean) => void) {
    // add event listener with selector as event name
    super.on(selector, callback);

    // add selector to list of selectors to watch
    this.selectors.push(selector);

    // check if selector exists in dom, if so, emit event
    const node = document.querySelector(selector);

    if (node) {
      this.emit(selector, node, node.isConnected);
    }
  }
}

export default new DOMObserver();
