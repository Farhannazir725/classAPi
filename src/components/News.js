import React, { Component } from 'react'
import NewsItem  from './NewsItem';
import Spinner  from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize : 8,
    category: "general"
  }  

  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    console.log("I am a constructor from news component");
    this.state = {
      articles: [],
      
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}- NewsDay`;
  }
  async updateNews(){  
    this.props.setProgress(10);  
    
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
this.setState({loading:  true});
let data  = await fetch(url);
let parsedData = await data.json();
console.log(parsedData);
this.setState({articles: parsedData.articles,
   totalResults: parsedData.totalResults,
    loading: false
  })
  this.props.setProgress(100); 
  }
   
  async componentDidMount(){
      console.log("cdm")
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bfdb342ffa544d8aa3e759af9ac427c4&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:  true});
    let data  = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles,
       totalResults: parsedData.totalResults,
        loading: false
      })
  }

  handlePreClick = async()=>{
    console.log("Previous Click Done");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bfdb342ffa544d8aa3e759af9ac427c4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:  true});
    // let data  = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page:    this.state.page - 1 ,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({page: this.state.page -1});
    this.updateNews();
  } 

  handleNextClick = async()=>{
    console.log("Next Click Done");
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bfdb342ffa544d8aa3e759af9ac427c4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //       this.setState({loading:  true});
    //       let data  = await fetch(url);
    //       let parsedData = await data.json();
    //       console.log(parsedData);
    //       this.setState({
    //         page:    this.state.page + 1 ,
    //         articles: parsedData.articles,
    //         loading: false
    //       })
    //     }
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }
  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
this.setState({loading:  true});
let data  = await fetch(url);
let parsedData = await data.json();
console.log(parsedData);
  this.setState({
    articles: this.state.articles.concat(parsedData.articles),
     totalResults: parsedData.totalResults
    })
    
  }
 
  render() {
    console.log("render");
    return (
      <>
        <h1 className='text-center' style={{margin: '35px 0px'}}>NewsDay - Breaking News From {this.capitalizeFirstLetter(this.props.category)}</h1>
          {this.state.loading &&<Spinner/>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
   return <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
        })}
              
            
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between mt-2">
          <button disabled={this.state.page<=1} type="button" className='btn btn-dark mx-3' onClick={this.handlePreClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
          
        </div> */}
      </>
    )
  }
}

export default News
