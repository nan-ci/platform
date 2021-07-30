import { useState } from 'preact/hooks'
import { navigate } from '../../../lib/router.js'
import { TiretSvg } from './tiret.jsx'
import { generateStepName } from '../../../lib/user.js'
import { Location ,Point } from '../../icons.jsx'
import { css } from '../../../lib/dom.js'

css(`
.contain {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.point {
  position:absolute;
  left:50%;
  right:50%;
  transform:translate(-50%,-50%);
  top:-15px;
  color:white;
  width:100px;
}
`)

export const CoursSvg = ({
  moduleId,
  coursId,
  lock,
  project,
  link,
  userLevel,
  ...props
}) => {
  const stepName = generateStepName(moduleId, coursId)
  const [color, setColor] = useState(lock ? 'grey' : 'var(--cyan-darker)')
  return (
    <div class="contain">
      {((!project && moduleId + coursId > 2) || project) && (
        <TiretSvg colour={!lock ? 'var(--cyan-darker)' : 'grey'} />
      )}
      <div
        onClick={() => !lock && navigate(link)}
        onMouseEnter={() => !lock && setColor('var(--green-light)')}
        onMouseLeave={() => !lock && setColor('var(--cyan-darker)')}
        style={{
          cursor: !lock ? 'pointer' : 'not-allowed',
          position: 'relative',
        }}
        {...props}
      >
        <span class={'point'}>
          {!project ? stepName : 'L' + moduleId + '-x'}
        </span>
        {(project && userLevel === 'L' + moduleId + '-X') ||
        userLevel === stepName ? (
          <Location color={color} size={20} />
        ) : (
          <Point color={color} size={20} />
        )}
      </div>
    </div>
  )
}
