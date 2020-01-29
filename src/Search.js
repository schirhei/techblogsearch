import React, { Component } from 'react';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            repo: "",
            loading: "",
            sites: [],
            amount: 0
        }
        this.findLinks = this.findLinks.bind(this)
    }

    findLinks() {
        this.setState({ loading: "Loading..."} )
        this.setState({ sites: [] })
        fetch(`https://techblogsearch.herokuapp.com/${this.state.repo}`)
        .then(res => res.json())
        .then(res => {
            if (res.message) {
                this.setState({sites: <div id="message"><h2>Github says: </h2>{res.message}</div>})
            } else {
                for (var i = 0; i < res.length; i++) {
                    this.loadLinks(res[i])
                }
                
            }
            this.setState({ loading: ""})
        })
        .catch(e => {
            console.log(e);
            this.setState({ loading: "Something went horribly wrong."})
        });
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
                    <div className="press">
                        <input type="text" placeholder="github owner/repo" onInput={e => this.setState({ repo: e.target.value })} onKeyDown={e => { if (e.keyCode === 13) this.findLinks() }}/>
                        <button onClick={this.findLinks}>Go</button>
                    </div>
                </div>
                <br></br>
                <div style={{"color":"yellowgreen", "textAlign": "center"}}>{ this.state.loading }</div>
                <div>{ this.state.sites }</div>
            </>
        )
    }
}