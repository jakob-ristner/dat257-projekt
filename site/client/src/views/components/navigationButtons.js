import React from 'react'
import Home from '../home/Home'
class navigation extends React.Component{
    render(){
        return(
            <button onClick={() => {
                navigation.navigate('Home')
            }}> Hello </button>
        )
    }
}
export default navigation;


