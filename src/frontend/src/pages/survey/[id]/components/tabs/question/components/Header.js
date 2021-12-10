import React, { PureComponent } from 'react'
import { Image } from 'antd';

class Header extends PureComponent {
    render() {
        return (<div style={{width:'100%', height:'15rem', backgroundColor:"#ffdd77", marginBottom:"20px" }}>
            {/*<Image src="/logo.png" width='100%' height='15rem'/>*/}
        </div>)
    }
}

export default Header
