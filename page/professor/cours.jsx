import { Div, P } from '../../component/elements'
import { Layout } from '../../component/layout.jsx'
import { logo } from '../../data/ascii'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { user } from '../../lib/auth.js'
import { navigate } from '../../lib/router'
import { useState } from 'preact/hooks'
import { ModuleCard } from '../../component/professor/ModuleCard'
import { ModalModule } from '../../component/professor/ModalModule'

css(`
   .prof-cours-addModuleButton {
     padding: 0.5rem;
     float:right;
     cursor: pointer;
     background: red;
     border:none;
   }
`)

export const Cours = () => {
  const [showModal, setShowModal] = useState(false)
  const [modules, setModules] = useState([])

  return (
    <Layout>
      <button
        class="prof-cours-addModuleButton"
        onClick={() => setShowModal(true)}
      >
        {' '}
        + module
      </button>
      <section style={{ marginTop: '50px' }}>
        {modules.length > 0 ? (
          modules.map((module) => (
            <ModuleCard key={module.name} data={module} />
          ))
        ) : (
          <P
            style={{
              textAlign: 'center',
              fontWeight: 'bolder',
              fontSize: '1.3rem',
            }}
          >
            No Modules, please add one
          </P>
        )}
      </section>

      <ModalModule
        show={showModal}
        close={() => setShowModal(false)}
        addModule={(data) => setModules((val) => [...val, data])}
      />
    </Layout>
  )
}
