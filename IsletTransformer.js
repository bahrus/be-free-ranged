import { getAdjacentChildren } from 'trans-render/lib/getAdjacentChildren.js';
export class IsletTransformer {
    templ;
    transformIslet;
    #transformNeeded = false;
    constructor(templ, transformIslet, host) {
        this.templ = templ;
        this.transformIslet = transformIslet;
        const { islet, transform, isletDependencies, transformDependencies } = transformIslet;
        const self = this;
        host.addEventListener('prop-changed', e => {
            const changeInfo = e.detail;
            const { prop, newVal, oldValue } = changeInfo;
            if (newVal === oldValue)
                return;
            if (isletDependencies.includes(prop)) {
                Object.assign(host, islet(host));
            }
            if (transformDependencies.has(prop)) {
                self.#transformNeeded = true;
                (async () => {
                    await self.doTransform();
                })();
            }
        });
    }
    async doTransform() {
        if (!this.#transformNeeded)
            return;
        this.#transformNeeded = false;
        const children = getAdjacentChildren(this.templ);
        const { transformer } = this.transformIslet;
        transformer.transform(children);
    }
}
