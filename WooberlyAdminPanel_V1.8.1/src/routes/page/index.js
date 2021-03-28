import React from 'react';
import Layout from '../../components/Layout';
import NotFound from '../not-found/NotFound';
import Page from './Page';
import fetch from 'node-fetch';
import { siteUrl } from '../../config';

async function action({ store, params }) {
    let title;
    let pageUrl = params.pageUrl;
    const query = `
    query getContentPage ($pageUrl: String) {
        getContentPage (pageUrl: $pageUrl) {
            id
            metaTitle
            metaDescription
            pageUrl
            pageTitle
            content
            isEnable
            pageBanner
        }
    }
`;

    const response = await fetch(`${siteUrl}/graphql`, {
        method: 'post',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { pageUrl }
        }),
        credentials: 'include'
    });

    const { data } = await response.json();

    if (data && data.getContentPage) {
        return {
            title: data && data.getContentPage && data.getContentPage.metaTitle,
            component: (
                <Layout><Page data={data}/></Layout>
            )
        }
    } else {
        title = "Not Found"
            return {
                title,
                component: <Layout><NotFound title={title} /></Layout>,
                status: 404,
            };
    }

    
}

export default action;