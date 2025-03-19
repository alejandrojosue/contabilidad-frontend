import { c as createComponent, a as createAstro, b as addAttribute, r as renderHead, e as renderComponent, f as renderTemplate, g as renderSlot, m as maybeRenderHead } from '../chunks/astro/server_BXAL7MSl.mjs';
import 'kleur/colors';
import { jsx } from 'react/jsx-runtime';
import { createContext, useState } from 'react';
export { renderers } from '../renderers.mjs';

const AuthContext = createContext({
  user: null,
  token: null,
  login: async (email, password) => {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok && data.jwt) {
      setToken(data.jwt);
      setUser(data.user);
    }
  }
  // Evita que `useAuth()` falle si `AuthProvider` no está definido
});
function AuthProvider({ children }) {
  const [token, setToken2] = useState(null);
  const [user, setUser2] = useState(null);
  const login = async (email, password) => {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log({ error: data.errors });
    if (res.ok && data.jwt) {
      setToken2(data.jwt);
      setUser2(data.user);
    }
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, token, login }, children });
}

const Layout = ({ children }) => {
  return /* @__PURE__ */ jsx(AuthProvider, { children });
};

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro Basics</title>${renderHead()}</head> <body> ${renderComponent($$result, "Layout", Layout, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Dell Latitude 3400/OneDrive/Documentos/repositorio/SAAS/frontend/src/components/Layout", "client:component-export": "Layout" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} </body></html>`;
}, "C:/Users/Dell Latitude 3400/OneDrive/Documentos/repositorio/SAAS/frontend/src/layouts/Layout.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl">Login</h1>  ${renderComponent($$result2, "Login", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "C:/Users/Dell Latitude 3400/OneDrive/Documentos/repositorio/SAAS/frontend/src/components/Login", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Dell Latitude 3400/OneDrive/Documentos/repositorio/SAAS/frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/Dell Latitude 3400/OneDrive/Documentos/repositorio/SAAS/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
