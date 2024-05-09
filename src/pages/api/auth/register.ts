import type { APIRoute } from "astro";
import { supabase } from "src/lib/supabase";
import { isValidEmail } from "src/lib/helpers/isValidEmail";

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

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

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: import.meta.env.DEV
				? "http://localhost:4321/user/login"
				: `${import.meta.env.WEBSITE_BASE_URL}/user/login`,
		},
	});

	if (error) {
		return new Response(error.message, { status: 500 });
	}

	return redirect("/user/sign-up/confirm");
};
