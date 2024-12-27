// This middleware checks by self and if user is not login the it redirects user to login page
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
