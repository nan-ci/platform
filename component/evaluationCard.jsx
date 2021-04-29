import {Link,Image} from './elements.jsx';

export const EvaluationCard = ({data}) => {
  return <Link href={`/evaluation/${data.id}`}>
  <div class="plaint-card">
      <span class="badge">{data.name}</span>
      <div class="illustration">
          <Image image={"illustrations/"+data.image} alt="illustration" />
      </div>
      <span class="pc-title">{data.title}</span>
      <small>{data.time} heures avant fermeture</small>
  </div>
</Link>
};

