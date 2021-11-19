import { PureComponent } from 'react'
import { Card } from 'antd';

class Question extends PureComponent {
    render() {
        return (
            <div style={{marginBottom: '2rem'}}>
                <Card>
                    <div style={{marginBottom: '2rem', display: 'flex', justifyContent: 'space-between'}}>
                        <textarea style={{border: 0, resize: 'none', height: '1.5rem', width: '100%', maxWidth: '100%'}} placeholder="Write your question here..."></textarea>
                        <select>
                            <option>Short Answer</option>
                            <option>Paragraph</option>
                            <hr />
                            <option>Multiple choice</option>
                            <option>Checkbox</option>
                            <option>Dropdown</option>
                            <hr />
                            <option>File upload</option>
                            <hr />
                            <option>Date</option>
                            <option>Time</option>
                        </select>
                    </div>
                    <div style={{marginBottom: '2rem'}}>
                        <input type="radio" name="educationLevel" /> Primary <br/>
                        <input type="radio" name="educationLevel" /> Secondary <br/>
                        <input type="radio" name="educationLevel" /> University <br/>
                    </div>
                    <hr />
                    <div className={QuestionStyle.cardFooter} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div style={{paddingRight: '1rem'}}>
                            <span>Duplicate</span>
                        </div>
                        <div style={{paddingRight: '1rem'}}>
                            <span>Delete</span>
                        </div>
                        <div style={{paddingRight: '1rem'}}>
                            <span>Required</span>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Question