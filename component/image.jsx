
export const Img = ({source,alt,...rest}) => {
   return <img src={source.length > 0 ? '/assets/img/'+source : ''} alt={alt} {...rest} />
}
