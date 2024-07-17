/**
 * @param str
 * @param nodes
 * @returns {NodeListOf<ChildNode>|ActiveX.IXMLDOMNodeList|string|string|*}
 */
export const cleanHTML = function(str, nodes) {
	function stringToHTML() {
		let parser = new DOMParser();
		let doc = parser.parseFromString(str, 'text/html');
		return doc.body || document.createElement('body');
	}

	function removeScripts(html) {
		let scripts = html.querySelectorAll('script');
		scripts.forEach(script => script.remove());
	}

	function isPossiblyDangerous(name, value) {
		if (name.startsWith('on')) return true;
		if (['src', 'href', 'xlink:href'].includes(name)) {
			if (value.includes('javascript:') || value.includes('data:text/html')) return true;
		}
		return false;
	}

	function removeAttributes(elem) {
		let atts = elem.attributes;
		for (let {name, value} of atts) {
			if (isPossiblyDangerous(name, value)) {
				elem.removeAttribute(name);
			}
		}
	}

	function clean(html) {
		let nodes = html.children;
		for (let node of nodes) {
			removeAttributes(node);
			clean(node); // Recursively clean child nodes
		}
	}

	let html = stringToHTML();

	removeScripts(html);
	clean(html);

	return nodes ? html.childNodes : html.innerHTML;
};
