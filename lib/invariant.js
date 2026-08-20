//#region src/invariant.ts
const PACKAGE_NAME = "@huanlin/dsh-plugin-sidebar-brand-text";
const name = "sidebar-brand-text-invariant";
const inject = ["invariants"];
/**
* No runtime invariant: the single `sidebar.brand.name` slot registration
* is a registry-owned contribution whose disposal is proven by the
* declaration-aware `slots.inject()` rollback. The plugin retains no
* mutable state beyond the config snapshot closed over by the inject
* factory.
*/
const install = () => {};
/**
* Register this package's invariant companion.
* @param ctx - Cordis context carrying the invariant service.
* @returns the installed registration's disposer after setup succeeds.
*/
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));

//#endregion
export { apply, inject, name };