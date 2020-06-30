import React from 'react';
import { inject, observer } from 'mobx-react'
import Menu from './Menu';
import RedButton from './RedButton';



const Main = inject("userStore")(observer((props) => {


  return (
    <div>
      <Menu />
      <RedButton />
    </div>
  );
}))



export default Main