import React, { Component } from 'react';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            repo: "",
            loading: "",
            sites: [],
            amount: 0,
            okWithCookies: localStorage.getItem('okWithCookies'),
            cookieBanner: ""
        }
        this.findLinks = this.findLinks.bind(this);
        this.loadLinks = this.loadLinks.bind(this);
        this.acceptCookies = this.acceptCookies.bind(this)
    }

    componentDidMount() {
        if (!this.state.okWithCookies) {
            this.setState({cookieBanner: (<div id="cookie-banner">
            <p id="cookie-text">By continuing the use of this site, you consent to the use of cookies as outlined in our <a id="privacy-link" href="privacypolicy.html">Privacy Policy</a>.</p>
            <button id="agree" onClick={this.acceptCookies}>Ok</button>
        </div>)})
        }
    }

    findLinks() {
        this.setState({ loading: "Loading..."} )
        this.setState({ sites: [] })
        fetch(`https://techblogsearch.herokuapp.com/${this.state.repo}`)
        .then(res => res.json())
        .then(res => {
            if (res.message) {
                if (res.message === "You pressed Go too many times. Chill out.") {
                    this.setState({sites: <div id="message"><h3>{res.message}</h3></div>})
                } else {
                    this.setState({sites: <div id="message"><h2>Github says: </h2><h3>{res.message}</h3></div>})
                }
                
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

    acceptCookies() {
        localStorage.setItem('okWithCookies', true);
        this.setState({ cookieBanner: ""});
    }
    
    render() {
        
        return (
            <>
                <div id="search">
                    <div id="header">
                        <a id="about" href="about.html">about</a>
                        
                        <h2 style={{ "color": "yellowgreen", "margin":"0" }}>techblogsearch</h2>
                    
                        <a id="privacy" href="privacypolicy.html">privacy and cookie policy</a>
                    </div>
                        
                    <div className="press">
                        <input type="text" placeholder="github owner/repo" onInput={e => this.setState({ repo: e.target.value })} onKeyDown={e => { if (e.keyCode === 13) this.findLinks() }}/>
                        <button onClick={this.findLinks}>Go</button>
                    </div>
                </div>
                <br></br>
                <div style={{"color":"yellowgreen", "textAlign": "center"}}>{ this.state.loading }</div>
                <div>{ this.state.sites }</div>
                
                { this.state.cookieBanner }
            </>
        )
    }
}