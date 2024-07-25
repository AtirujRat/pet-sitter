export function middleware(request) {
  // const currentUser = request.headers?.authorization;
  // if (currentUser && request.nextUrl.pathname.startsWith("/")) {
  //   return Response.redirect(new URL("/", request.url));
  // } else if (
  //   !currentUser &&
  //   !request.nextUrl.pathname.startsWith("/login/owner")
  // ) {
  //   return Response.redirect(new URL("/login/owner", request.url));
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
