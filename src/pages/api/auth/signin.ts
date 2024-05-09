import type { APIRoute } from "astro";
import { supabase } from "src/lib/supabase";
import { isValidEmail } from "src/lib/helpers/isValidEmail";
import type { Provider } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const formData = await request.formData();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	// Logic for using provider sign ins
	const provider = formData.get("provider")?.toString();
	if (provider) {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: provider as Provider,
			options: {
				redirectTo: import.meta.env.DEV
					? "http://localhost:4321/api/auth/callback"
					: `${import.meta.env.WEBSITE_BASE_URL}/api/auth/callback`,
			},
		});

		if (error) {
			return new Response(error.message, { status: 500 });
		}

		return redirect(data.url);
	}

	// Server side validation
	if (!email || typeof email !== "string" || !isValidEmail(email)) {
		return new Response("Email is not valid", {
			status: 400,
		});
	}
	if (typeof password !== "string" || password.length < 6) {
		return new Response("Password must be at least 6 characters", {
			status: 400,
		});
	}

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		if (error instanceof Error) {
			if (error.message === "Invalid login credentials") {
				return new Response(error.message, { status: 401 });
			}
			if (error.message === "Email not confirmed") {
				return new Response(error.message, { status: 401 });
			}
		}
		return new Response(error.message, { status: 500 });
	}

	const { access_token, refresh_token } = data.session;
	cookies.set("sb-access-token", access_token, {
		sameSite: "strict",
		path: "/",
		secure: true,
	});
	cookies.set("sb-refresh-token", refresh_token, {
		sameSite: "strict",
		path: "/",
		secure: true,
	});

	return redirect("/dashboard/record");
};
