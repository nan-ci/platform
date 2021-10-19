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
  const getExoNumber = (name) => Number(name.split('-', 1).join(''))
  const getName = (name) => name.split('.', 1).join('')

  const isActive = (name) => {
    const keys = Object.keys(userInfo.results)
    const last = keys[keys.length - 1]
    const find = keys.findIndex((n) => n === getName(name))
    if (find && find === keys.length - 1 && !userInfo[getName(name)]?.pass)
      return true
    if (getExoNumber(name) === getExoNumber(last) + 1 && userInfo[last]?.pass)
      return true
    return false
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
          {fakeModule.children.map((child) => (
            <StackLi
              {...child}
              result={userInfo.results[getName(child.key)]}
              isActive={isActive(child.key)}
            />
          ))}
        </ul>
      </Div>
    </Div>
  )
}
