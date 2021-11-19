import React, { PureComponent } from 'react'
import { Image } from 'antd'

class Header extends PureComponent {
    render() {
        return (<div>
            <Image src="/logo.png" preview={false} width='100%' height='15rem'/>
        </div>)
    }
}

export default Header