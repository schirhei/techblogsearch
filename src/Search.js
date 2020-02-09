import React, { Component } from 'react';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            loading: "",
            sites: [],
            amount: 0,
            repoList: [],
            page: -1,
        }
        this.findLinks = this.findLinks.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.loadLinks = this.loadLinks.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.backPage = this.backPage.bind(this);
    }

    findLinks() {
        this.setState({ page: -1 })
        this.setState({ repoList: [] })
        this.setState({ sites: [] })
        this.setState({ loading: "Loading..."} )
        fetch(`https://techblogsearch.herokuapp.com/${this.state.query}`)
        .then(res => res.json())
        .then(res => {
            if (res.message) {
                if (res.message === "You pressed Go too many times. Chill out.") {
                    this.setState({sites: <div id="message"><h3>{res.message}</h3></div>})
                } else {
                    this.setState({sites: <div id="message"><h2>Github says: </h2><h3>{res.message}</h3></div>})
                }
                
            } else {
                if (res.total_count !== 0) {
                    var temp = []
                    for (var i = 0; i < res.items.length; i++) {
                        temp.push(res.items[i].full_name)
                    }
                    this.setState({repoList: temp, page: 0});
                    this.getUsers();
                } else {
                    this.setState({ loading: ""})
                    this.setState({sites: <div id="message"><h3>No results found.</h3></div>})
                }
            }
            
        })
        .catch(e => {
            console.log(e);
            this.setState({ loading: "Something went horribly wrong."})
        });
    }

    getUsers() {
        this.setState({ sites: [] })
        this.setState({ loading: "Loading..."})
        var repo = this.state.repoList[this.state.page];
        fetch(`https://techblogsearch.herokuapp.com/${repo}`)
        .then(res => res.json())
        .then(res => {
            if (res.length > 0) {
                for (var i = 0; i < res.length; i++) {
                    this.loadLinks(res[i])
                }
            } else {
                this.setState({sites: <div id="message"><h3>No blogs here.</h3></div>})
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

    nextPage() {
        var next = this.state.page + 1;
        this.setState({page : next}, () => this.getUsers())
    }

    backPage() {
        var back = this.state.page - 1;
        this.setState({page : back}, () => this.getUsers());
    }
    
    render() {
        var next = "";
        var back = "";
        if (this.state.page === 0) {
            next = (<button onClick={this.nextPage}>Next</button>);
            back = "";
        }
        if (this.state.page > 0) {
            next = (<button onClick={this.nextPage}>Next</button>);
            back = (<button onClick={this.backPage}>Back</button>);
        } 
        if (this.state.page === this.state.repoList.length) {
            next = "";
            back = (<button onClick={this.backPage}>Back</button>)
        }
        var repoTitle = "";
        var link = "";
        if (this.state.repoList[this.state.page]) {
            link = "https://github.com/" + this.state.repoList[this.state.page]
            repoTitle = (<a href={link}>{this.state.repoList[this.state.page]}</a>)
        }
        return (
            <>
                <div id="search">
                    <div style={{"display":"flex", "justifyContent":"center"}}>
                        <div id="header">
                            <a id="about" href="about.html">about</a>
                            
                            <h2 style={{ "color": "yellowgreen", "margin":"0" }}>techblogsearch</h2>
                        
                        </div>
                    </div>
                        
                    <div className="press">
                        <input type="text" placeholder="search" onInput={e => this.setState({ query: e.target.value })} onKeyDown={e => { if (e.keyCode === 13) this.findLinks() }}/>
                        <button onClick={this.findLinks}>Go</button>
                    </div>
                </div>
                <br></br>
                <h3><div id="message"><h3>{repoTitle}</h3></div></h3>
                <h1 id="loading">{ this.state.loading }</h1>
                <div>{ this.state.sites }</div>
                <div id="navi">{ back }{ next }</div>
            </>
        )
    }
}