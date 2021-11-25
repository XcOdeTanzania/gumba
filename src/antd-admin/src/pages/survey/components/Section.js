import React, { PureComponent } from 'react'
import { Card } from 'antd'

class Section extends PureComponent {
    render() {
        return (
            <div>
                <div style={{background: 'blue', padding: '0.5rem', display: 'inline-block', color: '#fff'}}>
                    {this.props.title}
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <Card>
                        <div>
                            <textarea style={{border: 0, resize: 'none', width: '100%', maxWidth: '100%', fontSize: '1.8rem'}} rows="1" placeholder="Untitled Section"></textarea> <br />
                            <textarea style={{border: 0, resize: 'none', height: '1.5rem', width: '100%', maxWidth: '100%'}} placeholder="Description (optional)"></textarea>
                        </div>
                    </Card>
                </div>
                <div>
                    <span>After section #</span> {' '}
                    <select>
                        <option>Continue to next section</option>
                        <option>Go to section # (section name)</option>
                        <option>Submit form</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default Section
