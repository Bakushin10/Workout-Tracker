import React from 'react';
import { Icon, Modal } from 'antd';
import { getWorkoutMenuName } from './utility/dictionary'

export default class ShowImage extends React.Component {

    constructor(){
        super();
        this.state = {
            visible: false
        }

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    showModal(){
        this.setState({visible: true,})
    }
    handleCancel(){
        this.setState({visible: false});
    }

    hoverImage(fileName){
        const file = "../css/image/"+ fileName + ".jpeg"
        const excerciseName = getWorkoutMenuName(fileName)
        return(
            <span>
                { excerciseName + " " }
                <Icon type="picture" theme="twoTone" twoToneColor="#eb2f96" onClick={this.showModal} />
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>{ excerciseName }</div>
                    <img src= {file} alt="Smiley face" height="150" width="150"></img>
                </Modal>
            </span>
        )
    }

    render(){
        return(
            <span>{this.hoverImage(this.props.fileName)}</span>
        )    
    }
}