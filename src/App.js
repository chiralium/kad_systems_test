import React from 'react';
import { AppProvider, Frame } from "@shopify/polaris";

import AppSearch from './AppSearch';
import AppWeathers from "./AppWeathers";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <AppProvider>
            <Frame topBar={<AppSearch/>}>
                <AppWeathers/>
            </Frame>
        </AppProvider>
    )
  }
}
export default App;
