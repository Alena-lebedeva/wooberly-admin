import React from 'react';
import Layout from '../../../components/Layout/Layout';
import Page from '../../../components/Page/Page';
import fetch from 'node-fetch';
import { siteUrl } from '../../../config'
import Driver from './Driver'


const query = `query getEditStaticPage ($id: Int!) {
  getEditStaticPage (id: $id) {
      id
      pageName
      content
      metaTitle
      metaDescription
      pageBanner
      createdAt
  }
}`;

async function action({ locale }) {
    const dataResult = await new Promise((resolve) => {
        require.ensure([], (require) => {
            try {
                resolve(require(`./driver.${locale}.md`));
            } catch (e) {
                resolve(require('./driver.md'));
            }
        }, 'driver');
    });

    const resp = await fetch(`${siteUrl}/graphql`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { id: 3 }
        }),
        credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.getEditStaticPage) {

        return {
            title: data.getEditStaticPage.metaTitle,
            description: data.getEditStaticPage.metaDescription,
            chunk: 'driver',
            component: <Layout><Driver data={data}/></Layout>,
        };

    } else {
        return {
            title: dataResult.title,
            chunk: 'driver',
            component: <Layout><Page {...dataResult} /></Layout>,
        };
    }
}

export default action