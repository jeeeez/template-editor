
/**
 * Create `span` for Placehoder display
 * @param innerHTML string
 * @param className string
 */
export function createSpanReplacementNode(innerHTML: string, className: string) {
  const $span = document.createElement('span');
  $span.innerHTML = innerHTML;
  if (className) {
    $span.classList.add(className);
  }
  return $span;
}
