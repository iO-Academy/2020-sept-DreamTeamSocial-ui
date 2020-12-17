import React, { Component } from 'react';
import FollowingList from "../followingList";

export class FollowingModal extends Component {

    render() {
        let showModalClass = (this.props.show ? '' : 'hidden');
            return (
                <div className={"backgroundModal " + showModalClass}>
                    <div className="followingModal">
                        <FollowingList type="modal" followingList={this.props.followingList}/>
                    </div>
                </div>
            )
    }
}

export default FollowingModal