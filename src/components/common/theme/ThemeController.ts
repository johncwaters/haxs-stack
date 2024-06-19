import type { Theme } from "daisyui";

/**
 * A controller for managing themes.
 */
export const ThemeController = {
	// Initial Themes
	themes: ["light", "dark"] as Theme[],

	/**
	 * Initializes the theme controller.
	 */
	init() {
		const theme = this.getThemeFromLocalStorage();
		if (!this.themes.includes(theme)) {
			this.saveThemeToLocalStorage(this.themes[0]);
		}
	},

	/**
	 * Saves the currently used theme to local storage.
	 * @param {Theme} theme - The theme to be saved.
	 */
	saveThemeToLocalStorage(theme: Theme) {
		if (this.themes.includes(theme)) {
			localStorage.setItem("theme", theme);
		}
	},

	/**
	 * Retrieves the currently used theme from local storage.
	 * @returns {Theme} The currently used theme.
	 */
	getThemeFromLocalStorage(): Theme {
		const theme = localStorage.getItem("theme") as Theme;
		if (this.themes.includes(theme)) {
			return theme;
		}
		return this.themes[0];
	},

	// toggle theme
	toggleTheme() {
		const theme = this.getThemeFromLocalStorage();
		const newTheme = theme === this.themes[0] ? this.themes[1] : this.themes[0];
		this.saveThemeToLocalStorage(newTheme);
		return newTheme;
	},
};
