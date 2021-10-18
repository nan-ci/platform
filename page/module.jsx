import { css } from '../lib/dom.js'
import { Div, P } from '../component/elements.jsx'
import { StackLi } from '../component/stackLi.jsx'
import fakeModule from '../data/fakeModule.json'
import userInfo from '../data/fakeUserData.json'

css(`
   .module h1 {
     font-size: 2rem;
     font-weight: bolder;
    }

    .module>hr {
      width: 100%;
      height: 2px;
      margin: 7px auto;
      background: grey;
    }

   .module p.description {
     white-space: normal !important;
     font-size: 1.2rem;
     padding: 0.5rem;
     margin: 10px auto;
  }

  .module p.title{
    font-size: 1.2rem;
    font-weight: bolder;
  }

  .module ul li {
    display: block;
  }

  .module ul.notions {
    margin-left: 20px;
  }

  .module ul.notions li{
    margin: 8px auto;
  }

  .module ul.notions li:before {
     content:  "👉";
     font-size: 1.1rem;
     margin-right: 10px;
  }

  .module .stack-content {
    margin-top: 25px;
  }

  .module .stack-content h3 {
    font-size: 2.5rem;
    font-weight: bolder;
  }

  .module ul.stack{
    height: 400px;
    width: 100%;
    overflow-x: hidden;
  }
`)

export const Module = () => {
  const getExoNumber = (name) => parseInt(name.split('-')[0])

  const getInfos = (name) => {
    const userProgress = Object.entries(userInfo.results)
    return userProgress.find(
      (r) => getExoNumber(r[0]) === getExoNumber(name),
    )[1]
  }

  const isPassed = (name) => {
    const [module, step] = userInfo.level
      .split('-')
      .map((r) => parseInt(r.slice(1)))
    const userProgress = Object.entries(userInfo.results)
    const moduleNumber = getExoNumber(fakeModule.name)
    const exoNumber = getExoNumber(name)
    if (
      module > moduleNumber ||
      (module === moduleNumber &&
        step >= exoNumber &&
        userProgress.find((r) => getExoNumber(r[0]) === exoNumber)[1].pass)
    ) {
      return true
    } else return false
  }

  const isNext = (name) => {
    const [module, step] = userInfo.level
      .split('-')
      .map((r) => parseInt(r.slice(1)))
    const userProgress = Object.entries(userInfo.results)
    const exoNumber = getExoNumber(name)
    if (module === getExoNumber(fakeModule.name)) {
      if (
        step === exoNumber &&
        !userProgress.find((r) => getExoNumber(r[0]) === exoNumber)[1]?.pass
      ) {
        return { info: true }
      } else if (
        exoNumber === step + 1 &&
        userProgress.find((r) => getExoNumber(r[0]) === step)[1]?.pass
      ) {
        return true
      }
    } else return false
  }

  return (
    <Div class="module">
      <h1> {fakeModule.name}</h1>
      <hr />
      <P class="description">{fakeModule.description}</P>
      <P class="title"> In this module you will learn : </P>
      <ul class="notions">
        {fakeModule.notions.map((n) => (
          <li>{n}</li>
        ))}
      </ul>
      <Div class="stack-content">
        <h3> Exercises </h3>
        <ul class="stack">
          {fakeModule.children.map(({ key, ...rest }) => (
            <StackLi
              key={key}
              data={rest}
              isPassed={isPassed(rest.name)}
              isNext={isNext(rest.name)}
              infos={
                isPassed(rest.name) || isNext(rest.name)?.info
                  ? getInfos(rest.name)
                  : null
              }
            />
          ))}
        </ul>
      </Div>
    </Div>
  )
}
