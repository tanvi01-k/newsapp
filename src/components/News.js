import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {

  constructor() {
    super();
    console.log("hello i am a constructor from news components");
    this.state = {
      articles: [],
      loading: true,
      page:1
    };
  }

 async componentDidMount(){
     let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e07dadfd56034d7ba9c7b7f8ad54ff91&pageSize=$(30)`;
     let data = await fetch(url);
     let parsedData = await data.json()
     console.log(parsedData);
     this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

  handlePreviousClick = async ()=>{
     console.log("Previous");
     let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e07dadfd56034d7ba9c7b7f8ad54ff91=${this.state.page - 1}&pageSize=$(30)`;
          let data = await fetch(url);
     let parsedData = await data.json()
     console.log(parsedData);
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
      })
  }
  
  handleNextClick = async ()=>{
      console.log("Next");
      if (this.state.page + 1 > Math.ceil(this.state.totalResults/30)){

      }
      else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e07dadfd56034d7ba9c7b7f8ad54ff91=${this.state.page + 1}&pageSize=$(30)`;
     let data = await fetch(url);
     let parsedData = await data.json()
     console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsHub - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title:""}
                  description={element.description?element.description:""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/30)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
