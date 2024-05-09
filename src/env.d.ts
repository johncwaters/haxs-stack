/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		email: string;
		userId: string;
	}
}

interface ImportMetaEnv {
	readonly SUPABASE_URL: string;
	readonly SUPABASE_ANON_KEY: string;
	readonly WEBSITE_BASE_URL: string;
	readonly WEBSITE_NAME: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
