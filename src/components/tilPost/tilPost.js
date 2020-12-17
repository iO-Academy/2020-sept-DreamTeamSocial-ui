import React, {Component} from 'react';
import './tilPost.css';

export class TilPost extends Component {

    render() {
        return (
            <div key={this.props.i} id={this.props._id} className="til_form">
                <div className="flex_til_titles"><p>Posted by: {this.props.username} </p>
                    <p>Share</p>
                    <p>Posted at: {this.props.formatDate(this.props.createdAt)}</p>
                </div>
                <p className="til_post_content">{this.props.tilPost}</p>
            </div>
        )
    }
}