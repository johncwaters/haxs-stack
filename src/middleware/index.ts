import { defineMiddleware } from "astro:middleware";
import { supabase } from "@lib/supabase";

// A protect route is a route that requires the user to be authenticated to access, otherwise redirect to the login page
const protectedRoutes: string[] = ["/dashboard/**", "/settings", "/profile"];
// A redirect route is a route that requires the user to be unauthenticated to access, otherwise redirect to another route
const redirectRoutes: string[] = ["/auth/*"];
// A list of routes that are considered API routes that require authentication to access
const apiRoute: string[] = []; // like "/api/*"

/**
 * Splits a given path into an array of path segments like '/api/*' returns ["api", "*"]
 *
 * @param path - The path to split.
 * @returns An array of path segments.
 */
function splitPath(path: string) {
	return path.split("/").filter(Boolean);
}

/**
 * Matches a given route against a given path. Supports wildcards "*" and "**".
 * @param route - An array representing the route to match.
 * @param path - An array representing the path to match against.
 * @returns A boolean indicating whether the route matches the path.
 */
function matchPath(route: string[], path: string[]) {
	let routeIndex = 0;
	let pathIndex = 0;

	while (routeIndex < route.length && pathIndex < path.length) {
		if (route[routeIndex] === "**") {
			return true; // "**" matches all subsequent segments
		}
		if (route[routeIndex] === "*" || route[routeIndex] === path[pathIndex]) {
			routeIndex++;
			pathIndex++;
		} else {
			return false;
		}
	}

	// Check for exact length match or trailing wildcard
	return (
		(routeIndex === route.length && pathIndex === path.length) ||
		(routeIndex === route.length - 1 && route[routeIndex] === "*")
	);
}

/**
 * Middleware to check authentication and handle token refresh
 */
export const onRequest = defineMiddleware(
	async ({ locals, url, cookies, redirect }, next) => {
		const { pathname } = url;
		const path = splitPath(pathname);

		// Function to check authentication and handle token refresh
		async function checkAuthenticationAndRefreshToken() {
			const accessToken = cookies.get("sb-access-token");
			const refreshToken = cookies.get("sb-refresh-token");

			if (!accessToken || !refreshToken) {
				return { authenticated: false };
			}

			const { data, error } = await supabase.auth.setSession({
				refresh_token: refreshToken.value,
				access_token: accessToken.value,
			});

			if (error) {
				cookies.delete("sb-access-token", { path: "/" });
				cookies.delete("sb-refresh-token", { path: "/" });
				return { authenticated: false };
			}

			// Set updated tokens and user details
			locals.email = data.user?.email ?? "";
			locals.userId = data.user?.id ?? "";

			cookies.set("sb-access-token", data?.session?.access_token ?? "", {
				sameSite: "strict",
				path: "/",
				secure: true,
				httpOnly: true,
			});
			cookies.set("sb-refresh-token", data?.session?.refresh_token ?? "", {
				sameSite: "strict",
				path: "/",
				secure: true,
				httpOnly: true,
			});

			return { authenticated: true };
		}

		// Check API routes
		if (apiRoute.some((route) => matchPath(splitPath(route), path))) {
			const authResult = await checkAuthenticationAndRefreshToken();

			if (!authResult.authenticated) {
				return new Response(
					JSON.stringify({ error: "Unauthorized", message: "Invalid session" }),
					{
						status: 401,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			return next();
		}

		// Check protected routes
		if (protectedRoutes.some((route) => matchPath(splitPath(route), path))) {
			const authResult = await checkAuthenticationAndRefreshToken();

			if (!authResult.authenticated) {
				return redirect("/user/login");
			}

			return next();
		}

		// Check redirect routes
		if (redirectRoutes.some((route) => matchPath(splitPath(route), path))) {
			const accessToken = cookies.get("sb-access-token");
			const refreshToken = cookies.get("sb-refresh-token");

			if (accessToken && refreshToken) {
				return redirect("/dashboard");
			}

			return next();
		}

		return next();
	},
);
