import { Div, P } from '../../component/elements'
import { Layout } from '../../component/layout.jsx'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { useState } from 'preact/hooks'
import { ModuleCard } from '../../component/professor/ModuleCard.jsx'
import { ModalModule } from '../../component/professor/ModalModule.jsx'
import { DeleteModal } from '../../component/professor/DeleteModal.jsx'

css(`
    .prof-cours-header{
       display:flex;
       flex-direction: row;
       align-items:center;
       justify-content: space-between;
    }

    .prof-cours-header>div{
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .prof-cours-header>div span{
       font-size: 1.7rem;
       font-weight:bolder;
    }

    .prof-cours-header h1{
       font-size: 1.7rem;
       text-decoration: underline
    }

   .prof-cours-addModuleButton {
     padding: 0.6rem;
     border-radius:0.5rem;
     cursor: pointer;
     background: var(--comment-darker);
     border:1px solid #444;
     outline: none;
   }
`)

export const Modules = () => {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [modules, setModules] = useState(
    sessionStorage.getItem('modules')
      ? JSON.parse(sessionStorage.getItem('modules'))
      : [],
  )
  const [module, setModule] = useState(null)

  const setModuleToUpdate = (moduleid, state) => {
    setModule(modules.find((m) => m.id === moduleid))
    state === 'update' ? setShowModal(true) : setShowDeleteModal(true)
  }

  return (
    <Layout>
      <section class="prof-cours-header">
        <Div>
          <h1>Modules</h1>
          <span>({modules.length})</span>
        </Div>
        <button
          class="prof-cours-addModuleButton"
          onClick={() => setShowModal(true)}
        >
          {' '}
          + module
        </button>
      </section>
      <section style={{ marginTop: '50px' }}>
        {modules.length > 0 ? (
          modules.map((module) => (
            <ModuleCard
              key={module.name}
              data={module}
              setModuleToUpdate={(id, state = 'update') =>
                setModuleToUpdate(id, state)
              }
            />
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

      {showModal && (
        <ModalModule
          show={showModal}
          modulesLength={modules.length}
          module={module}
          close={() => {
            setShowModal(false)
            setModule(null)
          }}
          setModule={(data, type) => {
            if (type === 'add') {
              sessionStorage.setItem(
                'modules',
                JSON.stringify([...modules, data]),
              )
              setModules((val) => [...val, data])
            } else {
              modules[modules.findIndex((m) => m.id === data.id)] = data
              sessionStorage.setItem('modules', JSON.stringify(modules))
              setModules([...modules])
            }
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          type="modules"
          show={showDeleteModal}
          message={`Do you want really delete  the module ${module.name} ??`}
          id={module.id}
          update={setModules}
          close={() => {
            setShowDeleteModal(false)
            setModule(null)
          }}
        />
      )}
    </Layout>
  )
}
