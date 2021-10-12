import { useEffect, useState } from 'preact/hooks'
import { css } from '../lib/dom.js'
import { Div, Span } from './elements'

css(`
   .module .stack-li {
        padding:0.7rem;
        width: 96%;
       margin: 7px  auto;
       border-radius: 0.4rem;
       display:flex;
       flex-direction:row;
       align-items:center;
       border:2px solid darkgrey;
       justify-content: space-between;
       cursor:not-allowed;
      }

      .module .stack-li.pass {
          border-color: white;
          background: white;
          cursor:pointer;
      }

    .module .stack-li.pass .check {
        background: var(--comment-darker);
        border-color: var(--comment-darker);
    }

    .module .stack-li.pass span.title {
      color: var(--comment-darker);
    }

    .module .stack-li.pass .second_block span{
      color: var(--comment-darker);
    }


      .module .stack-li.next {
        border:2px solid white;
        cursor:pointer;
      }

      .module .stack-li.next .check {
        border-color: white;
        color: white;
    }

    .module .stack-li.next span.title {
      color: white;
    }

    .module .stack-li.next .second_block span{
      color: white;
    }



      .module .stack-li .first_block{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content: flex-start;
      }

      .module .stack-li .first_block .emoji{
            font-size: 1.5rem;
            margin-right:5px;
      }

      .module .stack-li .check {
             height: 20px;
             width: 20px;
             border:1px solid darkgrey;
             border-radius: 0.4rem;
      }

      .module .stack-li span.title {
        font-size: 1.2rem;
        margin-left: 10px;
        color: darkgrey;
        font-weight:bolder;
      }


      .module .stack-li .second_block{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content: flex-start;
      }

      .module .stack-li .second_block span {
        color: darkgrey;
        font-weight:bolder;
      }

      .module .stack-li .second_block span:nth-child(1){
           margin-right: 15px;
      }


`)

export const StackLi = ({ name, dataType, isNext, isPassed, info }) => {
  return (
    <Div class={`stack-li ${isPassed ? 'pass' : isNext ? 'next' : ''}`}>
      <Div class="first_block">
        {dataType === 'quiz' ? (
          <span class="emoji">&#x1F4DA;</span>
        ) : (
          <span class="emoji">&#x270D;</span>
        )}
        <Span class="title">{name}</Span>
      </Div>
      {info && (
        <Div class="second_block">
          {dataType === 'exercise' ? (
            <>
              {info.seconds && <Span class="seconds"> {info.seconds}s</Span>}
              <Span class="attempts">{info.attempts} attempts</Span>{' '}
            </>
          ) : (
            <></>
          )}
        </Div>
      )}
    </Div>
  )
}
