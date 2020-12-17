import React, {Component} from 'react';
import './tilPost.css';
import MetaTags from 'react-meta-tags';


export class TilPost extends Component {

    render() {
        return (
            <>
                <div className="wrapper">
                    <MetaTags>
                        <title>TILTime</title>
                        <meta name={this.props.username} content={this.props.tilPost} />
                        <meta property="og:url" content=""/>
                        <meta property="og:title" content="TILTime Learning App" />
                        <meta property="og:image" content="%PUBLIC_URL%/TILTime-favicon.png" />
                        <meta name="twitter:title" content="TILTime Learning App" />
                        <meta name="twitter:image" content="%PUBLIC_URL%/TILTime-favicon.png" />
                    </MetaTags>
                </div>
                <div key={this.props.i} id={this.props._id} className="til_form">
                    <div className="flex_til_titles"><p>Posted by: {this.props.username} </p>
                        <p>Share</p>
                        <p>Posted at: {this.props.formatDate(this.props.createdAt)}</p>
                    </div>
                    <p className="til_post_content">{this.props.tilPost}</p>
                </div>
                </>
        )
    }
}