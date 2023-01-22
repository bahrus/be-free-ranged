import { define } from 'be-decorated/DE.js';
export class BeFreeRanged extends EventTarget {
    async instantiate(pp, mold) {
        const { host, transformIslets, self, template } = pp;
        const { DTR } = await import('trans-render/lib/DTR.js');
        const { getDestructArgs } = await import('trans-render/lib/getDestructArgs.js');
        const clone = template.content.cloneNode(true);
        for (const transformIslet of transformIslets) {
            const { transform, islet } = transformIslet;
            let { isletDependencies } = transformIslet;
            if (isletDependencies === undefined) {
                isletDependencies = transformIslet.isletDependencies = getDestructArgs(islet);
            }
            const ctx = {
                host,
                match: transform,
            };
            const transformer = new DTR(ctx);
            let { transformDependencies } = transformIslet;
            if (transformDependencies === undefined) {
                transformDependencies = transformIslet.transformDependencies = await transformer.getDep();
            }
            if (islet !== undefined) {
                Object.assign(host, islet(host));
            }
            await transformer.transform(clone);
        }
        console.log({ transformIslets });
        const cnt = clone.childNodes.length;
        if (self.nextElementSibling === null && self.parentElement !== null) {
            self.parentElement.appendChild(clone);
        }
        else {
            const { insertAdjacentClone } = await import('trans-render/lib/insertAdjacentClone.js');
            insertAdjacentClone(clone, self, 'afterend');
        }
        self.dataset.cnt = cnt + '';
        const { getAdjacentChildren } = await import('trans-render/lib/getAdjacentChildren.js');
        // for(const transformIslet of transformIslets!){
        //     const {transform, islet} = transformIslet;
        //     //const isletSt = islet.toString();
        //     const args = getDestructArgs(islet);
        //     console.log({args});
        // }
        // host!.addEventListener('prop-changed', e => {
        //     const prop = (e as CustomEvent).detail.prop;
        //     if(observe!.includes(prop)){
        //         islet(host);
        //         ctx.host = host;
        //         const children = getAdjacentChildren(refTempl);
        //         transformer.transform(children);
        //     }
        // });
        return mold;
    }
}
const tagName = 'be-free-ranged';
const ifWantsToBe = 'free-ranged';
const upgrade = 'template';
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            forceVisible: [upgrade],
            upgrade,
            virtualProps: ['transformIslets', 'host', 'template']
        },
        actions: {
            instantiate: {
                ifAllOf: ['transformIslets', 'host', 'template'],
                returnObjMold: {
                    resolved: true
                }
            }
        }
    },
    complexPropDefaults: {
        controller: BeFreeRanged,
    }
});
