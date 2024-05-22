let lastScrollTop = 0;
const navbar = document.getElementById("navbar") as HTMLElement;
const alwaysVisible = (navbar.dataset.alwaysvisible as string) === "true";

window.addEventListener("scroll", () => {
	if (alwaysVisible) return;

	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	if (scrollTop > lastScrollTop && scrollTop > 80) {
		navbar.style.top = "-64px";
	} else {
		navbar.style.top = "0";
	}
	lastScrollTop = scrollTop;
});
