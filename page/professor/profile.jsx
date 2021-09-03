import { useState, useEffect } from 'preact/hooks'
import { Div, divider, P } from '../../component/elements.jsx'
import { Img } from '../../component/image.jsx'
import { Layout } from '../../component/layout.jsx'
import { user } from '../../lib/auth.js'

export const Profile = () => {
  return (
    <Layout>
      <Div class="user-info">
        <Img
          uri="https://randomuser.me/api/portraits/women/13.jpg"
          size={120}
          className="user-img"
        />
        <Div class="infos">
          <header>Profile</header>
          <Div class="infos-section">
            <P>
              <strong>Username: </strong>{' '}
              <span>{user.username ?? user.name}</span>
            </P>
            <P>
              <strong>Name: </strong>
              <span>{user.name}</span>
            </P>
            <P>
              <strong>Email: </strong>
              <span>{user.email}</span>
            </P>
            <P>
              <strong>Speciality: </strong>
              <span>{user.speciality}</span>
            </P>
            <P>
              <strong> Member since: </strong>{' '}
              <span>
                {' '}
                {new Date().toLocaleString('fr-FR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
            </P>
            <P>
              <strong>Role: </strong> <span>{user.role}</span>
            </P>
          </Div>
        </Div>
      </Div>
    </Layout>
  )
}
