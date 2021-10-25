import { css } from '../lib/dom.js'
import { Div, P } from '../component/elements.jsx'
import { MTitle, MItalicWorld, MLi } from '../component/markdown.jsx'
import { StackLi } from '../component/stackLi.jsx'
import fakeModule from '../data/fakeModule.json'
import userInfo from '../data/fakeUserData.json'

css(`
   .module h1 {
     font-weight: bolder;
    }

   .module p.description {
     white-space: normal !important;
     padding: 0.5rem;
  }

  .module p.title{
    font-weight: bolder;
  }

  .module .stack-content h3 {
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
      <MTitle.h2>{fakeModule.name}</MTitle.h2>
      {'\n'}
      <P class="description">{fakeModule.description}</P>
      {'\n'}
      <Div class="notions">
        <MTitle.h3>Notions</MTitle.h3>
        {'\n'}
        <MItalicWorld>In this modue you wil learn :</MItalicWorld>
        {'\n'}
        <ul class="notions">
          {fakeModule.notions.map((n) => (
            <MLi>{n}</MLi>
          ))}
        </ul>
      </Div>
      {'\n'}
      <Div class="stack-content">
        <MTitle.h3>Exercises</MTitle.h3>
        {'\n'}
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
