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
        fetch(`https://api.github.com/repos/${this.state.repo}/contributors`)
        .then(res => res.json())
        .then(res => {
            if (res.message) {
                this.setState({sites: <div id="message"><p>Github says: </p>{res.message}</div>})
            } else {
                for (var i = 0; i < res.length; i++) {
                    this.state.users.push(res[i].url)
                }
            }
        })
        .then(r => this.loadLinks())
        .catch(e => console.log(e));
    }

    loadLinks() {
        var users = this.state.users;
        if (users.length > 0) {
            var counter = users.length;
            for (var i = 0; i < users.length; i++) {
                fetch(users[i])
                .then(re => re.json()) 
                .then(re => {
                    if (re.blog !== "" && !re.blog.includes("twitter")) {
                        this.setState({sites: this.state.sites.concat(
                                <p href={re.blog} key={re.blog} className="cluster" >
                                    <img className="avatar" src={re.avatar_url} alt={ "github profile picture of " + re.login } />
                                    <br></br>
                                    <a>{ re.blog.replace('http://', '').replace('https://', '') }</a>
                                </p>)
                            })
                    }
                    counter -= 1;
                    if (counter === 0) {
                        if (this.state.sites.length < 1) {
                            this.setState({sites: <div id="message">There are no blogs!</div>});
                        }
                    }
                })
                .catch(e => console.log(e))

            }
        } 
    }
    
    render() {
        return (
            <>
                <a id="about" href="about.html">about</a>
                <div id="search">
                    <h2 style={{ "color": "yellowgreen" }}>techblogsearch</h2>
                    <input type="text" placeholder="owner/repo"onInput={e => this.setState({ repo: e.target.value })} />
                    <button onClick={this.findLinks}>Go</button>
                </div>
                <br></br>
                { this.state.sites }
                
            </>
        )
    }
}