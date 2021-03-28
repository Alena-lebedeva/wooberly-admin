import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
import fetch from 'node-fetch';
import { siteUrl } from '../../../config'


const query = `query getEditStaticPage ($id: Int!) {
  getEditStaticPage (id: $id) {
      id
      pageName
      content
      metaTitle
      metaDescription
      createdAt
  }
}`;

async function action({ locale }) {
    const dataResult = await new Promise((resolve) => {
        require.ensure([], (require) => {
            try {
                resolve(require(`./support.${locale}.md`));
            } catch (e) {
                resolve(require('./support.md'));
            }
        }, 'support');
    });

    const resp = await fetch(`${siteUrl}/graphql`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { id: 1 }
        }),
        credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.getEditStaticPage) {

        return {
            title: data.getEditStaticPage.metaTitle,
            description: data.getEditStaticPage.metaDescription,
            chunk: 'support',
            component: <Layout><Page html={data.getEditStaticPage.content} title={data.getEditStaticPage.metaTitle} /></Layout>,
        };

    } else {
        return {
            title: dataResult.title,
            chunk: 'support',
            component: <Layout><Page {...dataResult} /></Layout>,
        };
    }
}

export default action