import { createClient } from "@supabase/supabase-js";

// https://docs.astro.build/en/guides/backend/supabase/
export const supabase = createClient(
	import.meta.env.SUPABASE_URL,
	import.meta.env.SUPABASE_ANON_KEY,
	{
		auth: {
			flowType: "pkce",
			autoRefreshToken: false,
			detectSessionInUrl: false,
			persistSession: true,
		},
	},
);
