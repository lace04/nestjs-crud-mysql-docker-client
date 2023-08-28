export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"], // Este archivo se ejecuta en todas las rutas que comiencen con /dashboard
};