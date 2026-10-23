export function reveal(node: HTMLElement) {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.classList.add('in');
		return;
	}
	const io = new IntersectionObserver(([e]) => {
		if (e.isIntersecting) {
			node.classList.add('in');
			io.disconnect();
		}
	}, { threshold: 0.15 });
	io.observe(node);
	return { destroy: () => io.disconnect() };
}
