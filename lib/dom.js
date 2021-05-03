export const css = (code) => {
  const style = document.createElement('style')
  style.innerHTML = code
  document.head.append(style)
}

export const link = (href,rel) => {
  const link = document.createElement('link');
  link.setAttribute('class','headLink');
  link.href = href;
  link.rel = rel;
  document.head.appendChild(link);
}
