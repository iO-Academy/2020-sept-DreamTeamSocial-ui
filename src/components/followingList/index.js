import React, { Component } from 'react';
import ListItem from "../followingListItem";
import Button from "../button";
import FollowingModal from "../followingModal";

export class FollowingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstTenFollowing: []
        }
    }

    componentDidMount() {
        let firstTen;
        if (this.props.type === 'onProfile') {
            firstTen = this.props.followingList.slice(0, 10);
        } else {
            firstTen = this.props.followingList;
        }
        this.setState({firstTenFollowing: firstTen})
    }

    render() {
        if (this.state.firstTenFollowing.length > 0) {
            return (
                <div className="followingList">
                    <h2>Following:</h2>
                    <ul>
                        {this.state.firstTenFollowing.map((user) => {
                            return <ListItem username={user} />
                        })}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="followingList">
                    <h2>Following:</h2>
                    <ul>
                        <li>Not following anyone.</li>
                    </ul>
                </div>
            )
        }
    }
}

export default FollowingList