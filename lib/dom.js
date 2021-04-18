export const css = code => {
  const style = document.createElement('style')
  style.innerHTML = code
  document.head.append(style)
}
