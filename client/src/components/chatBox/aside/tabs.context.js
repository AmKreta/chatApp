import React from 'react';

const TabsContext = React.createContext({ activeTab: 'chat', setActiveTab: () => { } });

export default TabsContext;