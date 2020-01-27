import React, { Component } from 'react';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            repo: "",
            users: [],
            sites: []
        }
        this.findLinks = this.findLinks.bind(this)
    }

    findLinks() {
        this.setState({sites: []});
        this.setState({users: []});
        fetch(`http://techblogsearch.herokuapp.com/${this.state.repo}`)
        .then(res => res.json())
        .then(res => {
            if (res.message) {
                this.setState({sites: <div id="message"><h2>Github says: </h2>{res.message}</div>})
            } else {
                for (var i = 0; i < res.length; i++) {
                    this.loadLinks(res[i])
                }
                
            }
        })
        
        .catch(e => console.log(e));
    }

    loadLinks(re) {

        if (re.blog !== "" && !re.blog.includes("twitter")) {
            if (!re.blog.includes("http")) {
                re.blog = "http://" + re.blog;
            }
            this.setState({sites: this.state.sites.concat(
                    <p key={Math.round(Math.random() * 10000)} className="cluster" >
                        <img href={re.blog} className="avatar" src={re.avatar_url} alt={ "github profile picture of " + re.login } />
                        <br></br>
                        <a href={re.blog}>{ re.blog.replace('http://', '').replace('https://', '') }</a>
                    </p>)
                })
        }
    }
    
    render() {
        return (
            <>
                <a id="about" href="about.html">about</a>
                <div id="search">
                    <h2 style={{ "color": "yellowgreen" }}>techblogsearch</h2>
                    <input type="text" placeholder="owner/repo" onKeyDown={e => {
                        if (e.keyCode === 13) {this.findLinks()}
                        this.setState({ repo: e.target.value })}
                        } />
                    <button onClick={this.findLinks}>Go</button>
                </div>
                <br></br>
                { this.state.sites }
                
            </>
        )
    }
}