import React from 'react'

const HomeContext = React.createContext({})

export const HomeProvider = HomeContext.Provider
export const HomeConsumer = HomeContext.Consumer

export default HomeContext