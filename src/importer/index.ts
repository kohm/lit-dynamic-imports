/* eslint-disable @typescript-eslint/no-explicit-any */
import { documentReady } from "./document";
import RequireContext = __WebpackModuleApi.RequireContext;

export interface Type<T> {
  new (...args: any[]): T;
}

interface WebpackLazyModule extends RequireContext {
  default?: Type<any>;
}

interface ImporterRequireContext {
  keys(): string[];

  (id: string): Promise<WebpackLazyModule>;

  <T>(id: string): T;

  resolve(id: string): string;

  /** The module id of the context module. This may be useful for module.hot.accept. */
  id: string | number;
}

export const componentInstances: any[] = [];

export const CMP_SELECTOR = 'ui-hero';

const UI_COMPONENTS_SELECTORS = ['ui-hero', 'ui-button'];

const cmpModulesCtx: ImporterRequireContext = require.context(
    '../ui-components',
    true,
    /^(?!.*\.css\.)(?!.*\.stories\.).*\.tsx?$/,
    'lazy'
  );

  const dynamicModulesImporter = (customElementName: string): void => {
    const cmpCtx = cmpModulesCtx.keys();
    const matched = cmpCtx.filter((path) =>
      path
        .toLocaleLowerCase()
        .includes(`/${customElementName.toLocaleLowerCase()}.ts`)
    );
  
    if (matched.length) {
      cmpModulesCtx(matched[0])
        .then((module) => {
          if (!module.default) {
            return;
          }
  
          const CmpModule = module.default;
          componentInstances.push({
            name: customElementName,
          });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(
            `There was a problem trying to instantiate ${customElementName}'s Handler`,
            error
          );
        });
    }
  };

  const mutationCallback = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      const nodesArray = <HTMLScriptElement[]>Array.from(mutation.addedNodes);
      console.log(mutation.type);
      if (nodesArray.length > 0) {
        nodesArray.forEach((addedNode: HTMLElement) => {
          if (addedNode && addedNode instanceof HTMLElement && UI_COMPONENTS_SELECTORS.includes(addedNode.tagName.toLocaleLowerCase())) {
            dynamicModulesImporter(addedNode.tagName.toLocaleLowerCase());
          }
        })
      }
    });
  };
  
  const observer$ = new MutationObserver(mutationCallback);

  const body = document.querySelector('body') as HTMLBodyElement;

  const staticImporter = () => {
    UI_COMPONENTS_SELECTORS.forEach((elementName) => {
      const $cmpSelector = document.querySelectorAll(elementName);

      if ($cmpSelector.length > 0) dynamicModulesImporter($cmpSelector[0].tagName.toLocaleLowerCase());
    })
  }

documentReady.ready(() => {
  observer$.observe(body, {
    subtree: true,
    childList: true,
    characterData: true,
  });

  staticImporter();
});