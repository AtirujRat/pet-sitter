export function middleware(request) {
  // const currentUser = request.headers.get("authorization");
  // console.log(10);
  // if (currentUser && !request.nextUrl.pathname.startsWith("/")) {
  //   return Response.redirect(new URL("/", request.url));
  // }
  // if (!currentUser && !request.nextUrl.pathname.startsWith("/")) {
  //   return Response.redirect(new URL("/login/owner", request.url));
  // }
}

export const config = {
  matcher: [`/sitters/:path*/booking/create`],
};
